import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order, OrderManager } from '@common/services/managers/order/order';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class AdminOrdersComponent implements OnInit{
  orders$!: Observable<Order[]>;
  @Output() statusChange = new EventEmitter<{ id: string; status: Order['status'] }>();

  constructor (
    public manager: OrderManager
  ) {}

  ngOnInit(): void {
    this.orders$ = this.manager.getAllOrders();
    this.orders$.pipe(
      tap(order => console.log(order))
    ).subscribe();
  }
}
