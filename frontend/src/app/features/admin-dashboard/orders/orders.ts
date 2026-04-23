import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '@common/services/managers/order/order';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class AdminOrdersComponent {
  @Input() orders: Order[] = [];
  @Output() statusChange = new EventEmitter<{ id: string; status: Order['status'] }>();
}
