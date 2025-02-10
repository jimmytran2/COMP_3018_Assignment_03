/**
 * Branch Service (branchServices.ts)
 *
 * This file defines functions for managing branch data.
 */

import { branchData } from "./branchData";

/**
 * @interface Branch
 * @description Represents a branch object
 */
export type Branch = {
  id: number;
  name: string;
  address: string;
  phone: string;
};

// Uses sample branch data from branchData.ts
const branches: Branch[] = [...branchData];
let newBranchId: number = branches.length;

/**
 * @description Create a new branch
 * @param {{name: string; address: string, phone: string}} branch - branch data
 * @returns {Promise<Branch>} promise that is resolved to the branch that is created
 */
export const createBranch = async (branch: {
  name: string;
  address: string;
  phone: string;
}): Promise<Branch> => {
  newBranchId++;
  const newBranch: Branch = { id: newBranchId, ...branch };
  branches.push(newBranch);
  return newBranch;
};

/**
 * @description Gets all branches
 * @returns {Promise<Branch[]>} promise that is resolved to all branches that are retrieved
 */
export const getAllBranches = async (): Promise<Branch[]> => {
  return branches;
};

/**
 * @description Gets branch by branch id
 * @param {number} id - unique id for a branch
 * @returns {Promise<Branch>} promise that is resolved to the branch thats retrieved
 * @throws {Error} branch id is not found
 */
export const getBranchById = async (id: number): Promise<Branch> => {
  const index: number = branches.findIndex((i) => i.id === id);

  if (index === -1) {
    throw new Error(`Branch with ID ${id} not found`);
  }

  return branches[index];
};

/**
 * @description Updates an existing branch
 * @param {number} id - unique id for a branch
 * @param {Partial<Branch>} branchData - object containing branch data to be updated
 * @returns {Promise<Branch>} promise that is resolved to the branch thats been updated
 * @throws {Error} branch id is not found
 */
export const updateBranch = async (
  id: number,
  branchData: Partial<Branch>
): Promise<Branch> => {
  const index: number = branches.findIndex((i) => i.id === id);

  if (index === -1) {
    throw new Error(`Branch with ID ${id} not found`);
  }

  const safeBranchData: Partial<Branch> = { ...branchData };
  delete safeBranchData.id;

  branches[index] = { ...branches[index], ...safeBranchData };
  return branches[index];
};

/**
 * @description Deletes an existing branch
 * @param {number} id - a unique id for a branch
 * @returns {Promise<void>}
 * @throws {Error} branch id is not found
 */
export const deleteBranch = async (id: number): Promise<void> => {
  const index: number = branches.findIndex((i) => i.id === id);

  if (index === -1) {
    throw new Error(`Branch with ID ${id} not found`);
  }

  branches.splice(index, 1);
};
