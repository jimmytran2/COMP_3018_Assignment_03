import { Request, Response, NextFunction } from "express";
import * as branchController from "../src/api/v1/controllers/branchControllers";
import * as branchService from "../src/api/v1/services/branchServices";
import type { Branch } from "../src/api/v1/services/branchServices";

jest.mock("../src/api/v1/services/branchServices");

describe("Branch Controller", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
    mockReq = { params: {}, body: {} };
    mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    mockNext = jest.fn();
  });

  describe("createBranch", () => {
    it("should handle a succesful operation", async () => {
      const mockBranch: Branch = {
        id: 1,
        name: "Vancouver Branch",
        address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
        phone: "604-456-0022",
      };

      (branchService.createBranch as jest.Mock).mockResolvedValue(mockBranch);

      await branchController.createBranch(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Branch created",
        data: mockBranch,
      });
    });
  });

  describe("getAllBranches", () => {
    it("should handle a successful operation", async () => {
      const mockBranch: Branch[] = [
        {
          id: 1,
          name: "Vancouver Branch",
          address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
          phone: "604-456-0022",
        },
      ];

      (branchService.getAllBranches as jest.Mock).mockResolvedValue(mockBranch);

      await branchController.getAllBranches(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Branches retrieved",
        data: mockBranch,
      });
    });
  });

  describe("getBranchById", () => {
    it("should handle a successful operation", async () => {
      const mockBranch: Branch = {
        id: 1,
        name: "Vancouver Branch",
        address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
        phone: "604-456-0022",
      };

      (branchService.getBranchById as jest.Mock).mockResolvedValue(mockBranch);

      await branchController.getBranchById(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Branch retrieved",
        data: mockBranch,
      });
    });
  });

  describe("updateBranch", () => {
    it("should handle a successful operation", async () => {
      const mockBranch: Branch = {
        id: 1,
        name: "Vancouver Branch",
        address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
        phone: "604-456-0022",
      };

      (branchService.updateBranch as jest.Mock).mockResolvedValue(mockBranch);

      await branchController.updateBranch(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Branch updated",
        data: mockBranch,
      });
    });
  });

  describe("deleteBranch", () => {
    it("should handle a successful operation", async () => {
      (branchService.deleteBranch as jest.Mock).mockResolvedValue(undefined);

      await branchController.deleteBranch(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Branch deleted",
      });
    });
  });
});
