import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { ValidationError } from "../errors/error";

import { MiddlewareFunction, RequestData } from "../types/expressTypes";

export const validate = <T>(schema: ObjectSchema<T>, data: T): void => {
  const { error } = schema.validate(data, { abortEarly: false });
  if (error) {
    throw new ValidationError(
      `Validation error: ${error.details.map((x) => x.message).join(", ")}`
    );
  }
};

export const validateRequest = (schema: ObjectSchema): MiddlewareFunction => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: RequestData = {
        ...req.body,
        ...req.params,
        ...req.query,
      };
      validate(schema, data);
      next();
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(400).json({ error: (error as Error).message });
      }
    }
  };
};
