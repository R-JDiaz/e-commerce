import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '@common/services/managers/order/order';

@Component({
  selector: 'app-order-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-card.html',
  styleUrl: './order-card.scss',
})
export class OrderCardComponent {

  @Input() order!: Order;
  @Output() received = new EventEmitter<string>();

  markReceived(): void {
    this.received.emit(this.order.id);
  }
}