import request from "supertest";
import app from "../src/app";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getEmployeeByBranch,
  getEmployeeByDepartment,
} from "../src/api/v1/controllers/employeeControllers";
import type { Employee } from "../src/api/v1/services/employeeServices";

jest.mock("../src/api/v1/controllers/employeeControllers", () => ({
  createEmployee: jest.fn((req, res) => res.status(201).send()),
  getAllEmployees: jest.fn((req, res) => res.status(200).send()),
  getEmployeeById: jest.fn((req, res) => res.status(200).send()),
  updateEmployee: jest.fn((req, res) => res.status(200).send()),
  deleteEmployee: jest.fn((req, res) => res.status(200).send()),
  getEmployeeByBranch: jest.fn((req, res) => res.status(200).send()),
  getEmployeeByDepartment: jest.fn((req, res) => res.statsu(200).send()),
}));

describe("Employee Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST api/v1/employees", () => {
    it("should call createEmployee controller", async () => {
      const mockEmployee: Employee = {
        id: 1,
        name: "John Doe",
        position: "Manager",
        department: "Accounting",
        email: "johndoe@pixell-river.com",
        phone: "123-456-7890",
        branch: 9,
      };

      await request(app).post("/api/v1/employees").send(mockEmployee);
      expect(createEmployee).toHaveBeenCalled();
    });
  });

  describe("GET /api/v1/employees", () => {
    it("should call getAllEmployees controller", async () => {
      await request(app).get("/api/v1/employees");
      expect(getAllEmployees).toHaveBeenCalled();
    });
  });

  describe("GET /api/v1/employees/:id", () => {
    it("should call getEmployeeById controller", async () => {
      const mockId: number = 1;

      await request(app).get(`/api/v1/employees/${mockId}`);
      expect(getEmployeeById).toHaveBeenCalled();
    });
  });

  describe("PUT /api/v1/employees/:id", () => {
    it("should call updateEmployee controller", async () => {
      const mockEmployee: Partial<Employee> = {
        id: 1,
        name: "John Doe",
        position: "Manager",
        department: "Accounting",
        email: "johndoe@pixell-river.com",
        phone: "123-456-7890",
        branch: 9,
      };

      const mockId: number = 1;

      await request(app).put(`/api/v1/employees/${mockId}`).send(mockEmployee);
      expect(updateEmployee).toHaveBeenCalled();
    });
  });

  describe("DELETE /api/v1/employees/:id", () => {
    it("should call deleteEmployee controller", async () => {
      const mockId: number = 1;
      await request(app).delete(`/api/v1/employees/${mockId}`);
      expect(deleteEmployee).toHaveBeenCalled();
    });
  });

  describe("GET /api/v1/employees/branches/:branch", () => {
    it("should call getEmployeeByBranch controller", async () => {
      const mockBranchId: number = 1;
      await request(app).get(`/api/v1/employees/branches/${mockBranchId}`);
      expect(getEmployeeByBranch).toHaveBeenCalled();
    });
  });

  describe("GET /api/v1/employees/departments/:department", () => {
    it("should call getEmployeeByDepartment controller", async () => {
      const mockDepartment: string = "Accounting";
      await request(app).get(`/api/v1/employees/departments/${mockDepartment}`);
      expect(getEmployeeByDepartment).toHaveBeenCalled();
    });
  });
});
