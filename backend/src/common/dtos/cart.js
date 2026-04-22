import { productCartDTO } from "./product.js";


export const cartItemFullDTO = (item, product) => {
  const subtotal = product.price * item.quantity;

  return {
    id: item.id,
    product: {
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url || null
    },
    quantity: item.quantity,
    subtotal
  };
};


export const cartFullDTO = (rows) => {
  const first = rows[0];

  const mapped = rows.map((p) => productCartDTO(p));

  const totalItems = mapped.reduce((acc, item) => {
    return acc + (item.quantity || 0);
  }, 0);

  const totalPrice = mapped.reduce((acc, item) => {
    return acc + (item.quantity * item.price|| 0);
  }, 0);

  return {
    id: first.cart_id,
    user_id: first.user_id,
    products: mapped,
    total_items: totalItems ?? 0,
    total_price: totalPrice ?? 0
  };
}
