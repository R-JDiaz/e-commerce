import { OrderDetailDTO } from "@common/dtos/order.dto";
import { Order } from "../order";


export class OrderMapper {

  static toOrder(dto: OrderDetailDTO): Order {
  return {
    id: String(dto.id),              
    userId: String(dto.user_id),    
    items: dto.items,
    total: dto.total_amount,
    status: dto.status,
    createdAt: dto.created_at,
    shippingAddr: dto.shipping_addr
  };
}

  static toOrderList(dtos: OrderDetailDTO[]): Order[] {
    return dtos.map(this.toOrder);
  }
}