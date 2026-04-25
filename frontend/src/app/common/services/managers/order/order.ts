import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CartItem } from '../cart/cart';
import {
  CreateOrderRequest,
  OrderApiService,
  OrderDetail,
  OrderStatus,
  OrderSummary,
  UpdateOrderStatusRequest,
} from '@common/services/api/order/order-api.service';

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
  constructor(private api: OrderApiService) {}

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
      map(orders => orders.map(order => this.mapSummary(order)))
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
}

export { OrderManager as OrderService };
