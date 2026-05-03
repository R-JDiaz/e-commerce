import {
  requiredPositiveInteger,
  requiredString,
} from "../../common/validation/fields.js";

export const validateSupportThreadId = (params) => {
  const { value, errors } = requiredPositiveInteger("id", params.id);

  return {
    value: { id: value },
    errors,
  };
};

export const validateSupportVisitorKey = (params) => {
  const { value, errors } = requiredString("visitorKey", params.visitorKey, {
    min: 8,
    max: 80,
  });

  return {
    value: { visitorKey: value },
    errors,
  };
};

export const validateSupportMessage = (body) => {
  const { value: message, errors } = requiredString("message", body.message, {
    min: 1,
    max: 500,
  });

  return {
    value: { message },
    errors,
  };
};
