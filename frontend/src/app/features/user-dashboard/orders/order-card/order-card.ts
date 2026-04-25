import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Order } from '@common/services/managers/order/order';

@Component({
  selector: 'app-order-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-card.html',
  styleUrl: './order-card.scss',
})
export class OrderCardComponent {

  @Input() order!: Order;

  @Output() received = new EventEmitter<string>();
  @Output() pay = new EventEmitter<{ id: string; amount: number }>();

  paymentAmount: number | null = null;

  isExpanded = true; // 🔥 NEW

  toggle(): void {
    this.isExpanded = !this.isExpanded;
  }

  get isPaymentValid(): boolean {
    return (
      this.paymentAmount !== null &&
      this.paymentAmount >= this.order.total
    );
  }

  markReceived(): void {
    this.received.emit(this.order.id);
  }

  payOrder(): void {
    if (!this.isPaymentValid) return;

    this.pay.emit({
      id: this.order.id,
      amount: this.paymentAmount!
    });

    this.paymentAmount = null;
  }

  
}