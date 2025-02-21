import db from "../../../../config/firebaseConfig";
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { RepositoryError } from "../errors/error";

/**
 * Defines the allowed data types that can be stored in Firestore.
 * These types are restricted to ensure type safety when working with Firestore documents.
 */
type FirestoreDataTypes =
  | string
  | number
  | boolean
  | null
  | Timestamp
  | FieldValue;

interface FieldValuePair {
  fieldName: string;
  fieldValue: FirestoreDataTypes;
}

/**
 * Executes a Firestore transaction with provided operations.
 * Transactions in Firestore allow you to perform multiple operations atomically.
 *
 * @template T - The expected return type of the transaction
 * @param operations - A function that receives a transaction object and returns a Promise
 * @returns Promise resolving to the transaction result
 * @throws Error if the transaction fails
 *
 * @example
 * const result = await runTransaction(async (transaction) => {
 *   const docRef = db.collection('users').doc('userId');
 *   const doc = await transaction.get(docRef);
 *   // Perform operations with transaction
 *   return someValue;
 * });
 */
export const runTransaction = async <T>(
  operations: (transaction: FirebaseFirestore.Transaction) => Promise<T>
): Promise<T> => {
  try {
    return await db.runTransaction(operations);
  } catch (error: unknown) {
    console.error(`Transaction failed: ${error}`);
    throw new RepositoryError(`Transaction Failed`);
  }
};

/**
 * Creates a new document in the specified collection.
 *
 * @template T - The type of data being stored
 * @param collectionName - The name of the collection to create the document in
 * @param data - The data to be stored in the document
 * @param id - Optional custom document ID. If not provided, Firestore will auto-generate one
 * @returns Promise resolving to the created document's ID
 * @throws Error if document creation fails
 *
 * @example
 * const docId = await createDocument('users', { name: 'John', age: 25 });
 */
export const createDocument = async <T>(
  collectionName: string,
  data: Partial<T>,
  id?: string
): Promise<string> => {
  try {
    let docRef: FirebaseFirestore.DocumentReference;

    if (id) {
      docRef = db.collection(collectionName).doc(id);
      await docRef.set(data);
    } else {
      docRef = await db.collection(collectionName).add(data);
    }

    return docRef.id;
  } catch (error: unknown) {
    console.error(`Transaction failed: ${error}`);
    throw new RepositoryError(`Transaction Failed`);
  }
};

/**
 * Retrieves all documents from a specified collection.
 * Note: Be cautious with this function on large collections as it fetches all documents.
 *
 * @param collectionName - The name of the collection to retrieve documents from
 * @returns Promise resolving to a QuerySnapshot containing all documents
 * @throws Error if fetching documents fails
 */
export const getDocuments = async (
  collectionName: string
): Promise<FirebaseFirestore.QuerySnapshot> => {
  try {
    return await db.collection(collectionName).get();
  } catch (error: unknown) {
    throw new RepositoryError(
      `Failed to fetch documents from ${collectionName}`
    );
  }
};
