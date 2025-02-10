/**
 * Branch Controller (branchController.ts)
 *
 * This file defines controllers for handling requests and responses realted to branches.
 * The controllers interact with the branch services to performance logic for
 * CRUD operations on the branches
 */

import { Request, Response, NextFunction } from "express";
import * as branchService from "../services/branchServices";
import type { Branch } from "../services/branchServices";

/**
 * @description Create a new branch
 * @route POST /
 * @returns {Promise<void>}
 */
export const createBranch = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const newBranch: Branch = await branchService.createBranch(req.body);
    res.status(201).json({ message: "Branch created", data: newBranch });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Get all branches
 * @route GET /
 * @returns {Promise<void>}
 */
export const getAllBranches = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const branches: Branch[] = await branchService.getAllBranches();
    res.status(200).json({ message: "Branches retrieved", data: branches });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Gets branch with corresponding id
 * @route GET /:id
 * @returns {Promise<void>}
 */
export const getBranchById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const branch: Branch = await branchService.getBranchById(
      Number(req.params.id)
    );
    res.status(200).json({ message: "Branch retrieved", data: branch });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Update an existing branch
 * @route PUT /:id
 * @returns {Promise<void>}
 */
export const updateBranch = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const updatedBranch: Branch = await branchService.updateBranch(
      Number(req.params.id),
      req.body
    );

    res.status(200).json({ message: "Branch updated", data: updatedBranch });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Delete a branch
 * @route DELETE /:id
 * @returns {Promise<void>}
 */
export const deleteBranch = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await branchService.deleteBranch(Number(req.params.id));
    res.status(200).json({ message: "Branch deleted" });
  } catch (error) {
    next(error);
  }
};
