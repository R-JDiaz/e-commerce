import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin, map, switchMap, tap } from 'rxjs';
import { CartItem } from '../cart/cart';
import {
  CreateOrderRequest,
  OrderApiService,
  OrderDetail,
  OrderStatus,
  OrderSummary,
  UpdateOrderStatusRequest,
} from '@common/services/api/order/order-api.service';
import { OrderDetailDTO, OrderSummaryDTO } from '@common/dtos/order.dto';
import { OrderMapper } from './mapper/order.mapper';

export interface OrderItem {
  id: string | number;
  product: {
    id: string | number;
    name: string;
    price: number;
  };
  quantity: number;
  subtotal: number;
}
export interface OrderData {
  totalQuantity: number;
  totalSpent: number;
  totalOrders: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  shippingAddr?: string;
}

@Injectable({
  providedIn: 'root',
})
export class OrderManager {
  private isLoaded = false;
  private readonly orderDataSubject = new BehaviorSubject<OrderData>({
    totalQuantity: 0,
    totalSpent: 0,
    totalOrders: 0,
  });

  readonly orderData$ = this.orderDataSubject.asObservable(); 

  private readonly orderSubject = new BehaviorSubject<OrderSummaryDTO[]>([]);
  readonly orders$ = this.orderSubject.asObservable();

  private readonly orderFullSubject = new BehaviorSubject<Order[]>([]);
  readonly orderFull$ = this.orderFullSubject.asObservable();

  constructor(private api: OrderApiService) {}

  private load(): void {
    if (this.isLoaded) return;

    this.api.getOrders().pipe(
      tap(orders => {
        this.orderSubject.next(orders);
        this.isLoaded = true;
      }),

      switchMap(orders => {
        const requests = orders.map(order =>
          this.api.getOrderById(order.id)
        );

        return forkJoin(requests);
      }),

      tap(fullOrders => {
        const mappedOrders = OrderMapper.toOrderList(fullOrders);

        this.orderFullSubject.next(mappedOrders);

        const orderData = this.computeOrderData(mappedOrders);
        this.orderDataSubject.next(orderData);
      })

    ).subscribe();
  }

  public refreshOrder(id: string | number): Observable<Order> {
    return this.api.getOrderById(String(id)).pipe(
      map(order => this.mapDetail(order)),

      tap((updatedOrder: Order) => {
        const currentOrders = this.orderFullSubject.value;

        const updatedOrders = currentOrders.map(order =>
          String(order.id) === String(updatedOrder.id)
            ? updatedOrder
            : order
        );
        const exists = currentOrders.some(
          order => String(order.id) === String(updatedOrder.id)
        );

        if (!exists) {
          updatedOrders.push(updatedOrder);
        }

        this.orderFullSubject.next(updatedOrders);

        // Recompute aggregated stats
        const orderData = this.computeOrderData(updatedOrders);
        this.orderDataSubject.next(orderData);
      })
    );
  } 

  public getDetailedOrder() : Observable<Order[]> {
    this.load();

    return this.orderFull$;
  }

  private mapSummary(order: OrderSummary): Order {
    return {
      id: String(order.id),
      userId: String(order.user_id ?? ''),
      items: [],
      total: order.total_amount,
      status: order.status,
      createdAt: order.created_at,
    };
  }

  private mapDetail(order: OrderDetail): Order {
    return {
      id: String(order.id),
      userId: String(order.user_id),
      items: order.items.map(item => ({
        id: item.id,
        product: item.product,
        quantity: item.quantity,
        subtotal: item.subtotal,
      })),
      total: order.total_amount,
      status: order.status,
      createdAt: order.created_at,
      shippingAddr: order.shipping_addr,
    };
  }

  placeOrder(_userId: string, _items: CartItem[], shippingAddr: string): Observable<Order> {
    const request: CreateOrderRequest = {
      shipping_addr: shippingAddr,
    };

    return this.api.createOrder(request).pipe(
      map(order => this.mapDetail(order))
    );
  }

  getUserOrders(_userId: string): Observable<Order[]> {
    return this.api.getOrders().pipe(
      map(orders => {
        const mapped = orders.map(order => this.mapSummary(order));

        this.orderDataSubject.next(this.computeOrderData(mapped));

        return mapped;
      })
    );
  }

  getAllOrders(): Observable<Order[]> {
    return this.api.getAllOrders().pipe(
      map(orders => orders.map(order => this.mapSummary(order)))
    );
  }

  getOrderById(orderId: string): Observable<Order> {
    return this.api.getOrderById(orderId).pipe(
      map(order => this.mapDetail(order))
    );
  }

  updateOrderStatus(orderId: string, status: Order['status']): Observable<Order> {
    const request: UpdateOrderStatusRequest = { status };

    return this.api.updateOrderStatus(orderId, request).pipe(
      map(order => this.mapDetail(order))
    );
  }

  private computeOrderData(orders: Order[]): OrderData {
    let totalQuantity = 0;
    let totalSpent = 0;

    orders.forEach(order => {
      totalSpent += order.total;

      order.items.forEach(item => {
        totalQuantity += item.quantity;
      });
    });

    return {
      totalQuantity,
      totalSpent,
      totalOrders: orders.length,
    };
  }
}

export { OrderManager as OrderService };
