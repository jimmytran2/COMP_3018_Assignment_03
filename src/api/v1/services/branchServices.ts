/**
 * Branch Service (branchServices.ts)
 *
 * This file defines functions for managing branch data.
 */

import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../repositories/firestoreRepository";

import { ServiceError } from "../errors/error";

const COLLECTION: string = "branches";

/**
 * @interface Branch
 * @description Represents a branch object
 */
export type Branch = {
  id: string;
  name: string;
  address: string;
  phone: string;
};

/**
 * @description Create a new branch
 * @param {Partial<Branch>} branch - branch data
 * @returns {Promise<Branch>} promise that is resolved to the branch that is created
 * @throws {ServiceError} - unable to create branch
 */
export const createBranch = async (
  branch: Partial<Branch>
): Promise<Branch> => {
  try {
    const id: string = await createDocument(COLLECTION, branch);
    return { id, ...branch } as Branch;
  } catch {
    throw new ServiceError(`Could not create branch`);
  }
};

/**
 * @description Gets all branches
 * @returns {Promise<Branch[]>} promise that is resolved to all branches that are retrieved
 * @throws {ServiceError} - unable to retrieve branches
 */
export const getAllBranches = async (): Promise<Branch[]> => {
  try {
    const snapshot: FirebaseFirestore.QuerySnapshot = await getDocuments(
      COLLECTION
    );

    return snapshot.docs.map((doc) => {
      const data: FirebaseFirestore.DocumentData = doc.data();
      return { id: doc.id, ...data } as Branch;
    });
  } catch (error) {
    throw new ServiceError(`Could not retrieve branches: ${error}`);
  }
};

/**
 * @description Gets branch by branch id
 * @param {string} id - unique id for a branch
 * @returns {Promise<Branch>} promise that is resolved to the branch thats retrieved
 * @throws {Error} branch id is not found
 */
export const getBranchById = async (id: string): Promise<Branch> => {
  try {
    const snapshot: FirebaseFirestore.DocumentSnapshot = await getDocumentById(
      COLLECTION,
      id
    );

    return snapshot.data() as Branch;
  } catch {
    throw new ServiceError(`Could not retrieve branch with id: ${id}`);
  }
};

/**
 * @description Updates an existing branch
 * @param {string} id - unique id for a branch
 * @param {Partial<Branch>} branch - object containing branch data to be updated
 * @returns {Promise<Branch>} promise that is resolved to the branch thats been updated
 * @throws {Error} branch id is not found
 */
export const updateBranch = async (
  id: string,
  branch: Partial<Branch>
): Promise<Branch> => {
  try {
    await updateDocument(COLLECTION, id, branch);
    return { id, ...branch } as Branch;
  } catch {
    throw new ServiceError(`Unable to update branch with id: ${id}`);
  }
};

/**
 * @description Deletes an existing branch
 * @param {string} id - a unique id for a branch
 * @returns {Promise<void>}
 * @throws {Error} unable to delete branch
 */
export const deleteBranch = async (id: string): Promise<void> => {
  try {
    const branch = await getDocumentById(COLLECTION, id);

    if (!branch) {
      throw new ServiceError(`Branch with id: ${id} does not exist.`);
    }
    await deleteDocument(COLLECTION, id);
  } catch {
    throw new ServiceError(`Unable to delete branch with id: ${id}`);
  }
};
