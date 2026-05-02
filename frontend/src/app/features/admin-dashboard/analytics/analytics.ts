import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { Chart } from 'chart.js/auto';
import { AnalyticsManager, AnalyticsData } from '../../../common/services/managers/analytics/analytics';
interface ActivityItem {
  message: string;
  date: string; // ✅ match manager
}

@Component({
  selector: 'app-admin-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.html',
  styleUrl: './analytics.scss',
})
export class AdminAnalyticsComponent implements OnInit, OnDestroy {

  /* 📊 Real data stream */
  data$!: Observable<AnalyticsData>;

  private salesChart!: Chart;
  private ordersChart!: Chart;

  constructor(private analyticsManager: AnalyticsManager) {}
  ngOnInit(): void {
    this.analyticsManager.init();
    this.data$ = this.analyticsManager.analytics$.pipe(
      tap(data => {
          requestAnimationFrame(() => {
    this.renderCharts(data);
  });
      })
    );
  }

  ngOnDestroy(): void {
    if (this.salesChart) {
      this.salesChart.destroy();
    }

    if (this.ordersChart) {
      this.ordersChart.destroy();
    }
  }

  /* 📊 Render Charts Dynamically */
  private renderCharts(data: AnalyticsData): void {
    this.createSalesChart(data);
    this.createOrdersChart(data);
  }

  /* ☕ SALES OVERVIEW CHART */
  private createSalesChart(data: AnalyticsData) {
    if (this.salesChart) {
      this.salesChart.destroy();
    }
    this.salesChart = new Chart('salesChart', {
      type: 'line',
      data: {
        labels: data.weeklySales.map(data => data.date), 
        datasets: [
          {
            label: 'Sales (₱)',
            data: data.weeklySales.map(data => data.total),
            borderColor: '#a16207',
            backgroundColor: 'rgba(161, 98, 7, 0.15)',
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#5c4033',
          },
          
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
  private createOrdersChart(data: AnalyticsData) {
    if (this.ordersChart) {
      this.ordersChart.destroy();
    }

    this.ordersChart = new Chart('ordersChart', {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'Pending', 'Cancelled'],
        datasets: [
          {
            data: [
              data.completedOrders,
              data.pendingOrders,
              data.cancelledOrders
            ],
            backgroundColor: [
              '#7a9e7e',
              '#facc15',
              '#c26a5a'
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