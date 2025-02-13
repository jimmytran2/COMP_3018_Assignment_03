import { Request, Response, NextFunction } from "express";
import { validate } from "../src/api/v1/middleware/validate";
import { employeeSchema } from "../src/api/v1/validation/employeeValidation";
import { branchSchema } from "../src/api/v1/validation/branchValidation";
import { Employee } from "src/api/v1/services/employeeServices";
import { Branch } from "src/api/v1/services/branchServices";

describe("Validate function for employees", () => {
  it("should not throw an error for valid employee data", () => {
    const data: Employee = {
      id: 1,
      name: "Jimmy",
      position: "Manager",
      department: "Finance",
      email: "jimmy@gmail.com",
      phone: "1234567890",
      branch: 1,
    };

    expect(() => validate(employeeSchema, data)).not.toThrow();
  });
});

describe("Validate function for branches", () => {
  it("should not throw an error for valid branch data", () => {
    const data: Branch = {
      id: 1,
      name: "Winnipeg Branch",
      address: "123 Street St",
      phone: "1234567890",
    };

    expect(() => validate(branchSchema, data)).not.toThrow();
  });
});
