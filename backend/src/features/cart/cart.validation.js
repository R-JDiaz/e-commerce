import {
  optionalPositiveInteger,
  requiredPositiveInteger,
} from "../../common/validation/fields.js";

export const validateCartProductId = (params) => {
  const { value, errors } = requiredPositiveInteger("itemId", params.itemId);
  return {
    value: { itemId: value },
    errors,
  };
};

export const validateAddCartItem = (body) => {
  const errors = [];
  const value = {};

  const productId = requiredPositiveInteger("productId", body.productId);
  const quantity = requiredPositiveInteger("quantity", body.quantity);

  errors.push(...productId.errors, ...quantity.errors);

  value.productId = productId.value;
  value.quantity = quantity.value;

  return { value, errors };
};

export const validateUpdateCartItem = validateAddCartItem;

export const validateRemoveCartItem = (body) => {
  const errors = [];
  const value = {};

  const productId = requiredPositiveInteger("productId", body.productId);
  errors.push(...productId.errors);
  value.productId = productId.value;

  return { value, errors };
};

