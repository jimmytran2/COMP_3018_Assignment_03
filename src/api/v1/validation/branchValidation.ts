import Joi, { ObjectSchema } from "joi";

export const branchSchema: ObjectSchema = Joi.object({
  id: Joi.number().integer().min(0).optional().messages({
    "number.base": "ID must be a number",
    "number.integer": "ID must be an integer",
    "number.min": "ID must be a positive number",
  }),
  name: Joi.string().required().messages({
    "any.required": "Name is required",
    "string.empty": "Name cannot be empty",
  }),
  address: Joi.string().required().messages({
    "any.required": "Address is required",
    "string.empty": "Address cannot be empty",
  }),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "any.required": "Phone number is required",
      "string.pattern.base": "Invalid phone number format",
      "string.empty": "Phone number cannot be empty",
    }),
});
