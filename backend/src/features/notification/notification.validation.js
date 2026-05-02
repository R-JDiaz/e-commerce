import {
  requiredPositiveInteger,
  requiredString,
  requiredOneOf,
} from "../../common/validation/fields.js";

const notificationTypes = ["order", "payment", "system"];

export const validateNotificationId = (params) => {
  const { value, errors } = requiredPositiveInteger("id", params.id);
  return {
    value: { id: value },
    errors,
  };
};

export const validateUserIdParam = (params) => {
  const { value, errors } = requiredPositiveInteger("userId", params.userId);
  return {
    value: { userId: value },
    errors,
  };
};

export const validateCreateNotification = (body) => {
  const errors = [];
  const value = {};

  const type = requiredOneOf("type", body.type, notificationTypes);
  errors.push(...type.errors);
  value.type = type.value;

  const message = requiredString("message", body.message, { min: 3, max: 500 });
  errors.push(...message.errors);
  value.message = message.value;

  return { value, errors };
};