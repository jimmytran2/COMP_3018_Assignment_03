import { Request, Response, NextFunction } from "express";
import { validate } from "../src/api/v1/middleware/validate";
import { employeeSchema } from "../src/api/v1/validation/employeeValidation";
import { branchSchema } from "../src/api/v1/validation/branchValidation";
import { Employee } from "src/api/v1/services/employeeServices";
import { Branch } from "src/api/v1/services/branchServices";

describe("Validate function for employees", () => {
  it("should not throw an error for valid employee data", () => {
    const data: Employee = {
      id: "1",
      name: "Jimmy",
      position: "Manager",
      department: "Finance",
      email: "jimmy@gmail.com",
      phone: "1234567890",
      branch: "1",
    };

    expect(() => validate(employeeSchema, data)).not.toThrow();
  });

  it("should throw an error for empty name", () => {
    const data: Employee = {
      id: "1",
      name: "",
      position: "Manager",
      department: "Finance",
      email: "jimmy@gmail.com",
      phone: "1234567890",
      branch: "1",
    };

    expect(() => validate(employeeSchema, data)).toThrow();
  });

  it("should throw an error for empty position", () => {
    const data: Employee = {
      id: "1",
      name: "Jimmy",
      position: "",
      department: "Finance",
      email: "jimmy@gmail.com",
      phone: "1234567890",
      branch: "1",
    };

    expect(() => validate(employeeSchema, data)).toThrow();
  });

  it("should throw an error for empty department", () => {
    const data: Employee = {
      id: "1",
      name: "Jimmy",
      position: "Manager",
      department: "",
      email: "jimmy@gmail.com",
      phone: "1234567890",
      branch: "1",
    };

    expect(() => validate(employeeSchema, data)).toThrow();
  });

  it("should throw an error for empty email", () => {
    const data: Employee = {
      id: "1",
      name: "Jimmy",
      position: "Manager",
      department: "Finance",
      email: "",
      phone: "1234567890",
      branch: "1",
    };

    expect(() => validate(employeeSchema, data)).toThrow();
  });

  it("should throw an error for empty phone", () => {
    const data: Employee = {
      id: "1",
      name: "Jimmy",
      position: "Manager",
      department: "Finance",
      email: "jimmy@gmail.com",
      phone: "",
      branch: "1",
    };

    expect(() => validate(employeeSchema, data)).toThrow();
  });

  it("should throw an error for empty branch", () => {
    const data: Employee = {
      id: "1",
      name: "Jimmy",
      position: "Manager",
      department: "Finance",
      email: "jimmy@gmail.com",
      phone: "1234567890",
      branch: "",
    };

    expect(() => validate(employeeSchema, data)).toThrow();
  });

  it("should throw an error for missing name", () => {
    const data: Partial<Employee> = {
      id: "1",
      position: "Manager",
      department: "Finance",
      email: "jimmy@gmail.com",
      phone: "1234567890",
      branch: "1",
    };

    expect(() => validate(employeeSchema, data)).toThrow();
  });

  it("should throw an error for missing position", () => {
    const data: Partial<Employee> = {
      id: "1",
      name: "",
      department: "Finance",
      email: "jimmy@gmail.com",
      phone: "1234567890",
      branch: "1",
    };

    expect(() => validate(employeeSchema, data)).toThrow();
  });

  it("should throw an error for missing department", () => {
    const data: Partial<Employee> = {
      id: "1",
      name: "",
      position: "Manager",
      email: "jimmy@gmail.com",
      phone: "1234567890",
      branch: "1",
    };

    expect(() => validate(employeeSchema, data)).toThrow();
  });

  it("should throw an error for missing email", () => {
    const data: Partial<Employee> = {
      id: "1",
      name: "",
      position: "Manager",
      department: "Finance",
      phone: "1234567890",
      branch: "1",
    };

    expect(() => validate(employeeSchema, data)).toThrow();
  });

  it("should throw an error for missing phone", () => {
    const data: Partial<Employee> = {
      id: "1",
      name: "",
      position: "Manager",
      department: "Finance",
      email: "jimmy@gmail.com",
      branch: "1",
    };

    expect(() => validate(employeeSchema, data)).toThrow();
  });

  it("should throw an error for missing branch", () => {
    const data: Partial<Employee> = {
      id: "1",
      name: "Jimmy",
      position: "Manager",
      department: "Finance",
      email: "jimmy@gmail.com",
      phone: "1234567890",
    };

    expect(() => validate(employeeSchema, data)).toThrow();
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
