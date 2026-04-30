import {
  requiredPositiveInteger,
  requiredString,
  requiredRating
} from "../../common/validation/fields.js";

// -------------------------
// CREATE REVIEW VALIDATION
// -------------------------
export const validateCreateReview = (body) => {
  const errors = [];

  const orderId = requiredPositiveInteger("order_id", body.order_id);
  const rating = requiredRating("rating", body.rating); 
  const comment = requiredString("comment", body.comment, {
    min: 3,
    max: 500,
  });

  errors.push(...orderId.errors);
  errors.push(...rating.errors);
  errors.push(...comment.errors);

  return {
    value: {
      order_id: orderId.value,
      rating: rating.value,
      comment: comment.value,
    },
    errors,
  };
};

// -------------------------
// PARAM VALIDATION
// -------------------------
export const validateReviewId = (params) => {
  const { value, errors } = requiredPositiveInteger("id", params.id);

  return {
    value: { id: value },
    errors,
  };
};

// -------------------------
// ORDER ID VALIDATION
// -------------------------
export const validateOrderId = (params) => {
  const { value, errors } = requiredPositiveInteger("order_id", params.order_id);

  return {
    value: { order_id: value },
    errors,
  };
};