import { OrderDetailDTO } from "@common/dtos/order.dto";
import { Order } from "../order";
import { createTracker } from "../tracking";
import { DomPlatform } from "chart.js";


export class OrderMapper {

  static toOrder(dto: OrderDetailDTO): Order {
  return {
    id: String(dto.id),              
    userId: String(dto.user_id),    
    items: dto.items,
    total: dto.total_amount,
    status: dto.status,
    createdAt: dto.created_at,
    review: dto.review,
    shippingAddr: dto.shipping_addr,
    tracking: createTracker(dto.status)
  };
}

  static toOrderList(dtos: OrderDetailDTO[]): Order[] {
    return dtos.map(this.toOrder);
  }
}