export const productDTO = (product) => ({
    id: product.product_id,
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    created_at: product.created_at,
    updated_at: product.updated_at
})

export const productListDTO = (product, primaryImage = null) => ({
  id: product.id,
  name: product.name,
  price: product.price,
  stock: product.stock,
  category_name: product.category_name,
  image_url: primaryImage?.image_url || null
});

export const productDetailDTO = (product, category, images = []) => ({
  id: product.id,
  name: product.name,
  description: product.description,
  price: product.price,
  stock: product.stock,
  category: category
    ? {
        id: category.id,
        name: category.name,
        slug: category.slug
      }
    : null,
  images: images.map(img => ({
    id: img.id,
    image_url: img.image_url
  })),
  created_at: product.created_at,
  updated_at: product.updated_at
});

export const productCartDTO = (product) => ({
  id: product.product_id,
  name: product.name,
  description: product.description,
  price: product.price,
  stock: product.stock,
  quantity: product.quantity, 
  image_url: product.image_url,
});