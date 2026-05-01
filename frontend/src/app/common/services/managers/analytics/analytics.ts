import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { OrderManager, Order } from '../order/order';
import { UserManager } from '../user/user';
import { OrderSummaryDTO } from '@common/dtos/order.dto';

export interface ActivityItem {
  type: 'order' | 'user' | 'system';
  message: string;
  date: string;
}

export interface WeeklySales {
  date: string; // ISO date
  total: number;
}
export interface AnalyticsData {
  totalSales: number;
  ordersToday: number;
  activeUsers: number;
  avgOrderValue: number;

  totalQuantity: number;
  totalSpent: number;
  totalOrders: number;

  salesGrowth: number;
  ordersYesterday: number;
  weeklySales: WeeklySales[];
  userGrowth: number;
  avgChange: number;

  pendingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  conversionRate: number;

  recentActivity: ActivityItem[];
}

@Injectable({
  providedIn: 'root',
})
export class AnalyticsManager {
  private readonly analyticsSubject = new BehaviorSubject<AnalyticsData>(
    this.getDefault()
  );

  readonly analytics$ = this.analyticsSubject.asObservable();

  constructor(
    private orderManager: OrderManager,
    private userManager: UserManager
  ) {
    this.orderManager.adminLoad();
    this.init();
    console.log('DATA:',this.analytics$);
  }

  private init(): void {
    combineLatest([
      this.orderManager.orders$,
      this.orderManager.orderData$,
      this.userManager.getUsers(),
    ])
      .pipe(
        map(([orders, orderData, users]) =>
          this.computeAnalytics(orders, orderData, users)
        )
      )
      .subscribe((data) => this.analyticsSubject.next(data));
  }
  
  private computeAnalytics(
    orders: Order[],
    orderData: { totalQuantity: number; totalSpent: number; totalOrders: number },
    users: any[]
  ): AnalyticsData {
    const today = new Date().toDateString();

    let ordersToday = 0;
    let ordersYesterday = 0;
    let weeklySales : WeeklySales[] = this.generateWeeklySales();
    let pending = 0;
    let completed = 0;
    let cancelled = 0;

    
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = yesterdayDate.toDateString();

    orders.forEach(order => {
      this.filterForWeeklySales(order, weeklySales);
      const orderDate = new Date(order.createdAt).toDateString();

      if (orderDate === today) ordersToday++;
      if (orderDate === yesterday) ordersYesterday++;

      switch (order.status) {
        case 'pending':
          pending++;
          break;
        case 'completed':
          completed++;
          break;
        case 'cancelled':
          cancelled++;
          break;
      }
    });

    console.log('SALES', weeklySales);
    
    const totalSales = orderData.totalSpent;
    const totalOrders = orderData.totalOrders;

    const avgOrderValue = totalOrders
      ? totalSales / totalOrders
      : 0;

    const salesGrowth = ordersYesterday
      ? ((ordersToday - ordersYesterday) / ordersYesterday) * 100
      : 0;

    const activeUsers = users.length;

    const conversionRate = users.length
      ? (totalOrders / users.length) * 100
      : 0;

    const userGrowth = 0;

    // Avg change placeholder
    const avgChange = 0;

    return {
      totalSales,
      ordersToday,
      activeUsers,
      avgOrderValue,

      totalQuantity: orderData.totalQuantity,
      totalSpent: orderData.totalSpent,
      totalOrders: orderData.totalOrders,

      salesGrowth,
      ordersYesterday,
      weeklySales,
      userGrowth,
      avgChange,

      pendingOrders: pending,
      completedOrders: completed,
      cancelledOrders: cancelled,
      conversionRate,

      recentActivity: this.buildRecentActivity(orders),
    };
  }

  private buildRecentActivity(orders: Order[]): ActivityItem[] {
    return orders
      .slice(-5)
      .reverse()
      .map(order => ({
        type: 'order',
        message: `Order #${order.id} is ${order.status}`,
        date: order.createdAt,
      }));
  }

  private getDefault(): AnalyticsData {
    return {
      totalSales: 0,
      ordersToday: 0,
      activeUsers: 0,
      avgOrderValue: 0,

      totalQuantity: 0,
      totalSpent: 0,
      totalOrders: 0,

      salesGrowth: 0,
      ordersYesterday: 0,
      weeklySales: [],
      userGrowth: 0,
      avgChange: 0,

      pendingOrders: 0,
      completedOrders: 0,
      cancelledOrders: 0,
      conversionRate: 0,

      recentActivity: [],
    };
  }

  formatDate(isoDate: string): string {
    const d = new Date(isoDate);
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${mm}-${dd}-${yyyy}`;
}

   generateWeeklySales(): WeeklySales[] {
    const sales: WeeklySales[] = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(today.getDate() - i);

        const dateKey = d.toISOString().split('T')[0];

        sales.push({
        date: dateKey,
        total: 0
        });
    }

    return sales;
    }

  filterForWeeklySales(order: Order, weeklySales: WeeklySales[]): void {
    const key = new Date(order.createdAt).toISOString().split('T')[0];

    const target = weeklySales.find(s => s.date === key);

    if (target) {
        target.total += Number(order.total);
    }
    }

}