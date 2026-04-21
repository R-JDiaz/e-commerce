// List view
export const orderListDTO = (order) => ({
  id: order.id,
  total_amount: order.total_amount,
  status: order.status,
  created_at: order.created_at
});

// Full details
export const orderDetailDTO = (order, items = []) => ({
  id: order.id,
  user_id: order.user_id,
  total_amount: order.total_amount,
  status: order.status,
  shipping_addr: order.shipping_addr,
  items: items.map(item => ({
    id: item.id,
    product_id: item.product_id,
    name: item.name,
    price: item.price,
    quantity: item.quantity
  })),
  created_at: order.created_at
});