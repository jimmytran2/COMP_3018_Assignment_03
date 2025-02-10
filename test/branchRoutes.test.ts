import request from "supertest";
import app from "../src/app";
import {
  createBranch,
  getAllBranches,
  getBranchById,
  updateBranch,
  deleteBranch,
} from "../src/api/v1/controllers/branchControllers";
import type { Branch } from "../src/api/v1/services/branchServices";

jest.mock("../src/api/v1/controllers/branchControllers", () => ({
  createBranch: jest.fn((req, res) => res.status(201).send()),
  getAllBranches: jest.fn((req, res) => res.status(200).send()),
  getBranchById: jest.fn((req, res) => res.status(200).send()),
  updateBranch: jest.fn((req, res) => res.status(200).send()),
  deleteBranch: jest.fn((req, res) => res.status(200).send()),
}));

describe("Branch Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST api/v1/branches", () => {
    it("should call createBranch controller", async () => {
      const mockBranch: Branch = {
        id: 1,
        name: "Vancouver Branch",
        address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
        phone: "604-456-0022",
      };

      await request(app).post("/api/v1/branches").send(mockBranch);
      expect(createBranch).toHaveBeenCalled();
    });
  });

  describe("GET /api/v1/branches", () => {
    it("should call getAllbranches controller", async () => {
      await request(app).get("/api/v1/branches");
      expect(getAllBranches).toHaveBeenCalled();
    });
  });

  describe("GET /api/v1/branches/:id", () => {
    it("should call getBranchesById controller", async () => {
      const mockId: number = 1;

      await request(app).get(`/api/v1/branches/${mockId}`);
      expect(getBranchById).toHaveBeenCalled();
    });
  });

  describe("PUT /api/v1/branches/:id", () => {
    it("should call updateBranch controller", async () => {
      const mockBranch: Partial<Branch> = {
        id: 1,
        name: "Vancouver Branch",
        address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
        phone: "604-456-0022",
      };

      const mockId: number = 1;

      await request(app).put(`/api/v1/branches/${mockId}`).send(mockBranch);
      expect(updateBranch).toHaveBeenCalled();
    });
  });

  describe("DELETE /api/v1/branch/:id", () => {
    it("should call deleteBranch controller", async () => {
      const mockId: number = 1;
      await request(app).delete(`/api/v1/branches/${mockId}`);
      expect(deleteBranch).toHaveBeenCalled();
    });
  });
});
