/**
 * Branch Service (branchServices.ts)
 *
 * This file defines functions for managing branch data.
 */

// import { branchData } from "./branchData";
// import { ServiceError } from "../errors/error";

import {
  createDocument,
  getDocuments,
  getDocumentById,
  getDocumentsByFieldValue,
  updateDocument,
  deleteDocument,
} from "../repositories/firestoreRepository";

const COLLECTION = "branches";

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
 */
export const createBranch = async (
  branch: Partial<Branch>
): Promise<Branch> => {
  const id: string = await createDocument(COLLECTION, branch);
  return { id, ...branch } as Branch;
};

/**
 * @description Gets all branches
 * @returns {Promise<Branch[]>} promise that is resolved to all branches that are retrieved
 */
export const getAllBranches = async (): Promise<Branch[]> => {
  const snapshot: FirebaseFirestore.QuerySnapshot = await getDocuments(
    COLLECTION
  );

  return snapshot.docs.map((doc) => {
    const data: FirebaseFirestore.DocumentData = doc.data();
    return { id: doc.id, ...data } as Branch;
  });
};

/**
 * @description Gets branch by branch id
 * @param {string} id - unique id for a branch
 * @returns {Promise<Branch>} promise that is resolved to the branch thats retrieved
 * @throws {Error} branch id is not found
 */
export const getBranchById = async (id: string): Promise<Branch> => {
  const snapshot: FirebaseFirestore.DocumentSnapshot = await getDocumentById(
    COLLECTION,
    id
  );

  const data = snapshot.data();
  return data as Branch;
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
  } catch (error) {
    throw new Error("Unable to update branch bruh");
  }
};

/**
 * @description Deletes an existing branch
 * @param {string} id - a unique id for a branch
 * @returns {Promise<void>}
 * @throws {Error} branch id is not found
 */
export const deleteBranch = async (id: string): Promise<void> => {
  await deleteDocument(COLLECTION, id);
};
