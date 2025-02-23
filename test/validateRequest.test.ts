import { Request, Response, NextFunction } from "express";
import { validateRequest } from "../src/api/v1/middleware/validate";
import { employeeSchema } from "../src/api/v1/validation/employeeValidation";
import { branchSchema } from "../src/api/v1/validation/branchValidation";
import { MiddlewareFunction } from "src/api/v1/types/expressTypes";

describe("validateRequest Middleware", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = {
      body: {},
      params: {},
      query: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      locals: {},
    };
    mockNext = jest.fn();
  });

  it("should pass for valid inputs for employeeSchema", () => {
    // Arrange
    mockReq.body = {
      name: "Jimmy",
      position: "Manager",
      department: "Finance",
      email: "jimmy@gmail.com",
      phone: "1234567890",
      branch: "1",
    };

    const middleware: MiddlewareFunction = validateRequest(employeeSchema);

    // Act
    middleware(mockReq as Request, mockRes as Response, mockNext);

    // Assert
    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
  });

  it("should fail for empty inputs for employeeSchema", () => {
    // Arrange
    mockReq.body = {
      id: "",
      name: "",
      position: "",
      department: "",
      email: "jimmy@gmail.com",
      phone: "",
      branch: "",
    };

    const middleware: MiddlewareFunction = validateRequest(employeeSchema);

    // Act
    middleware(mockReq as Request, mockRes as Response, mockNext);

    // Assert
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: expect.stringContaining("Validation error"),
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should fail for missing inputs for employeeSchema", () => {
    // Arrange
    mockReq.body = {
      birthday: "",
    };

    const middleware: MiddlewareFunction = validateRequest(employeeSchema);

    // Act
    middleware(mockReq as Request, mockRes as Response, mockNext);

    // Assert
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: expect.stringContaining("Validation error"),
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should fail for employeeSchema invalid email format", () => {
    // Arrange
    mockReq.body = {
      name: "Jimmy",
      position: "Manager",
      department: "Finance",
      email: "jimmygmailcom",
      phone: "1234567890",
      branch: "1",
    };

    const middleware: MiddlewareFunction = validateRequest(employeeSchema);

    // Act
    middleware(mockReq as Request, mockRes as Response, mockNext);

    // Assert
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: expect.stringContaining("Validation error"),
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should fail for employeeSchema invalid phone number format", () => {
    // Arrange
    mockReq.body = {
      name: "Jimmy",
      position: "Manager",
      department: "Finance",
      email: "jimmy@gmail.com",
      phone: "phone",
      branch: "1",
    };

    const middleware: MiddlewareFunction = validateRequest(employeeSchema);

    // Act
    middleware(mockReq as Request, mockRes as Response, mockNext);

    // Assert
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: expect.stringContaining("Validation error"),
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should pass for valid inputs for branchSchema", () => {
    // Arrange
    mockReq.body = {
      name: "Winnipeg Branch",
      address: "123 Street St",
      phone: "1234567890",
    };
    const middleware: MiddlewareFunction = validateRequest(branchSchema);

    // Act
    middleware(mockReq as Request, mockRes as Response, mockNext);

    // Assert
    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
  });

  it("should fail for empty inputs for branchSchema", () => {
    // Arrange
    mockReq.body = {
      name: "",
      address: "",
      phone: "",
    };
    const middleware: MiddlewareFunction = validateRequest(branchSchema);

    // Act
    middleware(mockReq as Request, mockRes as Response, mockNext);

    // Assert
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: expect.stringContaining("Validation error"),
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should fail for missing inputs for branchSchema", () => {
    // Arrange
    mockReq.body = {};
    const middleware: MiddlewareFunction = validateRequest(branchSchema);

    // Act
    middleware(mockReq as Request, mockRes as Response, mockNext);

    // Assert
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: expect.stringContaining("Validation error"),
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should fail for invalid phone number format", () => {
    // Arrange
    mockReq.body = {
      name: "Winnipeg Branch",
      address: "123 Street St",
      phone: "phone",
    };
    const middleware: MiddlewareFunction = validateRequest(branchSchema);

    // Act
    middleware(mockReq as Request, mockRes as Response, mockNext);

    // Assert
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: expect.stringContaining("Validation error"),
    });
    expect(mockNext).not.toHaveBeenCalled();
  });
});
