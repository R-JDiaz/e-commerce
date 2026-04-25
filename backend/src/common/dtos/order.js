// 🔹 LIST VIEW (for grouped rows)
export const orderListDTO = (rows) => {
  const first = rows[0];

  return {
    id: first.order_id,
    user_id: first.user_id,
    total_amount: first.total_amount,
    status: first.status,
    created_at: first.created_at
  };
};


// 🔹 DETAIL VIEW
export const orderDetailDTO = (rows) => {
  console.log(rows[0]);
  const first = rows[0];

  const mapped = rows
    .filter(item => item.order_item_id) // avoid null rows (LEFT JOIN)
    .map(item => orderItemFullDTO(item));

  return {
    id: first.order_id,
    user_id: first.user_id,
    total_amount: first.total_amount,
    status: first.status,
    shipping_addr: first.shipping_addr,
    items: mapped,
    created_at: first.created_at
  };
};


// 🔹 ORDER ITEM
export const orderItemFullDTO = (item) => {
  const price = item.product_price ?? item.price; // fallback safety
  const subtotal = price * item.quantity;

  return {
    id: item.order_item_id,
    product: {
      id: item.product_id,
      name: item.name,
      price
    },
    quantity: item.quantity,
    subtotal
  };
};
