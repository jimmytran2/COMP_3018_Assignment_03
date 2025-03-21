import Joi, { ObjectSchema } from "joi";

// https://stackoverflow.com/questions/57993305/how-can-i-validate-number-of-digits-from-joi-using-nodejs

export const employeeSchema: ObjectSchema = Joi.object({
  id: Joi.string().optional().messages({
    "any.required": "ID is required",
    "string.empty": "ID cannot be empty",
  }),
  name: Joi.string().required().messages({
    "any.required": "Name is required",
    "string.empty": "Name cannot be empty",
  }),
  position: Joi.string().required().messages({
    "any.required": "Position is required",
    "string.empty": "Position cannot be empty",
  }),
  department: Joi.string().required().messages({
    "any.required": "Department is required",
    "string.empty": "Department cannot be empty",
  }),
  // https://joi.dev/api/?v=17.13.3
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ca", "org"] },
    })
    .required()
    .messages({
      "any.required": "Email is required",
      "string.email": "Invalid email format",
      "string.empty": "Email cannot be empty",
    }),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "any.required": "Phone number is required",
      "string.pattern.base": "Invalid phone number format",
      "string.empty": "Phone number cannot be empty",
    }),
  branch: Joi.string().required().messages({
    "any.required": "Branch ID is required",
    "string.empty": "Branch ID cannot be empty",
  }),
});

export const deleteEmployeeSchema: ObjectSchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "ID is required",
    "string.empty": "ID cannot be empty",
  }),
});
