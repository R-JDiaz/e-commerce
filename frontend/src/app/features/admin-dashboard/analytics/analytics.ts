import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Chart } from 'chart.js/auto';

/* 📊 Activity item type */
interface ActivityItem {
  message: string;
  time: string;
}

/* 📈 Analytics data model */
interface AnalyticsData {
  totalSales: number;
  ordersToday: number;
  activeUsers: number;
  avgOrderValue: number;

  totalQuantity: number;
  totalSpent: number;
  totalOrders: number;

  salesGrowth: number;
  ordersYesterday: number;
  userGrowth: number;
  avgChange: number;

  pendingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  conversionRate: number;

  recentActivity: ActivityItem[];
}

@Component({
  selector: 'app-admin-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.html',
  styleUrl: './analytics.scss',
})
export class AdminAnalyticsComponent implements OnInit {

  /* 📊 Observable data */
  data$!: Observable<AnalyticsData>;

  constructor() {}

  ngOnInit(): void {

    /* ☕ MOCK DATA */
    const mockData: AnalyticsData = {
      totalSales: 12450,
      ordersToday: 38,
      activeUsers: 1284,
      avgOrderValue: 328.5,

      totalQuantity: 120,
      totalSpent: 12450,
      totalOrders: 38,

      salesGrowth: 12.4,
      ordersYesterday: 31,
      userGrowth: 8.7,
      avgChange: 3.2,

      pendingOrders: 14,
      completedOrders: 92,
      cancelledOrders: 6,
      conversionRate: 4.8,

      recentActivity: [
        { message: "New order #1023 placed", time: "2 mins ago" },
        { message: "Payment received ₱850", time: "10 mins ago" },
        { message: "User registered: Juan Dela Cruz", time: "30 mins ago" },
        { message: "Order #1018 completed", time: "1 hr ago" }
      ]
    };

    this.data$ = of(mockData);

    /* 📈 CHARTS */
    this.createSalesChart();
    this.createOrdersChart();
  }

  /* ☕ SALES OVERVIEW CHART */
  createSalesChart() {
    new Chart('salesChart', {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Sales (₱)',
            data: [1200, 1900, 1500, 2200, 3000, 2800, 3500],
            borderColor: '#a16207',
            backgroundColor: 'rgba(161, 98, 7, 0.15)',
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#5c4033',
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  /* 🍩 ORDERS BREAKDOWN CHART */
  createOrdersChart() {
    new Chart('ordersChart', {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'Pending', 'Cancelled', 'In Progress'],
        datasets: [
          {
            data: [65, 15, 10, 10],
            backgroundColor: [
              '#7a9e7e', // completed
              '#facc15', // pending
              '#c26a5a', // cancelled
              '#3b2a22'  // in progress
            ],
            borderWidth: 0
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }
}