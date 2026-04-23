import {
  emailAddress,
  optionalString,
  requiredOneOf,
  requiredPositiveInteger,
  requiredString,
} from "../../common/validation/fields.js";

const userRoles = ["customer", "admin"];

export const validateUserId = (params) => {
  const { value, errors } = requiredPositiveInteger("id", params.id);
  return {
    value: { id: value },
    errors,
  };
};

export const validateUpdateUser = (body) => {
  const errors = [];
  const value = {};

  if (Object.keys(body || {}).length === 0) {
    errors.push("At least one user field is required");
    return { value, errors };
  }

  if (Object.prototype.hasOwnProperty.call(body, "first_name")) {
    const firstName = requiredString("first_name", body.first_name, { min: 2, max: 100 });
    errors.push(...firstName.errors);
    value.first_name = firstName.value;
  }

  if (Object.prototype.hasOwnProperty.call(body, "last_name")) {
    const lastName = requiredString("last_name", body.last_name, { min: 2, max: 100 });
    errors.push(...lastName.errors);
    value.last_name = lastName.value;
  }

  if (Object.prototype.hasOwnProperty.call(body, "email")) {
    const email = emailAddress("email", body.email);
    errors.push(...email.errors);
    value.email = email.value;
  }

  if (Object.prototype.hasOwnProperty.call(body, "password")) {
    const password = requiredString("password", body.password, { min: 8, max: 255 });
    errors.push(...password.errors);
    value.password = password.value;
  }

  if (Object.prototype.hasOwnProperty.call(body, "role")) {
    const role = requiredOneOf("role", body.role, userRoles);
    errors.push(...role.errors);
    value.role = role.value;
  }

  return { value, errors };
};

