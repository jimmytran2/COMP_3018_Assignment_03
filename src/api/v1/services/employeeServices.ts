/**
 * Employee Service (employeeServices.ts)
 *
 * This file defines functions for managing employee data.
 */

import {
  createDocument,
  getDocuments,
  getDocumentById,
  getDocumentsByFieldValue,
  updateDocument,
  deleteDocument,
} from "../repositories/firestoreRepository";

import { ServiceError } from "../errors/error";

const COLLECTION: string = "employees";

/**
 * @interface Employee
 * @description Represents an employee object
 */
export type Employee = {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  branch: string;
};

/**
 * @description Create a new employee
 * @param {Partial<Employee>} employee data
 * @returns {Promise<Employee>} promise that is resolved to the employee thats created
 * @throws {ServiceError} - unable to create employee
 */
export const createEmployee = async (
  employee: Partial<Employee>
): Promise<Employee> => {
  try {
    const id: string = await createDocument(COLLECTION, employee);
    return { id, ...employee } as Employee;
  } catch {
    throw new ServiceError("Could not create employee");
  }
};

/**
 * @description Gets all employees
 * @returns {Promise<Employee[]>} promise that is resolved to all employees that are retrieved
 * @throws {ServiceError} - unable to retrieve employees
 */
export const getAllEmployees = async (): Promise<Employee[]> => {
  try {
    const snapshot: FirebaseFirestore.QuerySnapshot = await getDocuments(
      COLLECTION
    );

    return snapshot.docs.map((doc) => {
      const data: FirebaseFirestore.DocumentData = doc.data();
      return { id: doc.id, ...data } as Employee;
    });
  } catch {
    throw new ServiceError("Could not retrieve employees");
  }
};

/**
 * @description Gets employee by employee id
 * @param {string} id - unique id for an employee
 * @returns {Promise<Employee>} promise that is resolved when to the employee thats retrieved
 * @throws {Error} employee id is not found
 */
export const getEmployeeById = async (id: string): Promise<Employee> => {
  try {
    const snapshot: FirebaseFirestore.DocumentSnapshot = await getDocumentById(
      COLLECTION,
      id
    );

    return snapshot.data() as Employee;
  } catch {
    throw new ServiceError(`Could not retrieve employee with id: ${id}`);
  }
};

/**
 * @description Updates an existing employee
 * @param {string} id - a unique id for an employee
 * @param {Partial<Employee>} employee - object containing employee data to be updated
 * @returns {Promise<Employee>} promise that is resolved to the employee thats been updated
 * @throws {Error} employee id is not found
 */
export const updateEmployee = async (
  id: string,
  employee: Partial<Employee>
): Promise<Employee> => {
  try {
    await updateDocument(COLLECTION, id, employee);
    return { id, ...employee } as Employee;
  } catch {
    throw new ServiceError(`Unable to update employee with id: ${id}`);
  }
};

/**
 * @description Deletes an existing employee
 * @param {string} id - a unqiue id for an employee
 * @returns {Promise<void>}
 * @throws {Error} employee id is not found
 */
export const deleteEmployee = async (id: string): Promise<void> => {
  try {
    const employee: FirebaseFirestore.DocumentSnapshot = await getDocumentById(
      COLLECTION,
      id
    );

    if (!employee) {
      throw new ServiceError(`Employee with id: ${id} does not exist.`);
    }
    await deleteDocument(COLLECTION, id);
  } catch {
    throw new ServiceError(`Unable to delete employee with id: ${id}`);
  }
};

/**
 * @description Gets employees from a branch
 * @param {string} branchId - a unique id for a branch
 * @returns {Promise<Employee[]>} promise that is resolved to an array of the employees from the branch that are retrieved
 * @throws {ServiceError} no employees associated with branch
 */
export const getEmployeeByBranch = async (
  branchId: string
): Promise<Employee[]> => {
  try {
    const snapshot: FirebaseFirestore.QuerySnapshot =
      await getDocumentsByFieldValue(COLLECTION, "branch", branchId);

    return snapshot.docs.map((doc) => {
      const data: FirebaseFirestore.DocumentData = doc.data();
      return { id: doc.id, ...data } as Employee;
    });
  } catch {
    throw new ServiceError(
      `Could not retrieve employees from branch ${branchId}`
    );
  }
};

/**
 * @description Gets employees from a department
 * @param {string} department - name of the department
 * @returns {Promise<Employee[]>} promise that is resolved to an array of the employees from a department are retrieved
 * @throws {ServiceError} no employees associated with that department
 */
export const getEmployeeByDepartment = async (
  department: string
): Promise<Employee[]> => {
  try {
    const snapshot: FirebaseFirestore.QuerySnapshot =
      await getDocumentsByFieldValue(COLLECTION, "department", department);

    return snapshot.docs.map((doc) => {
      const data: FirebaseFirestore.DocumentData = doc.data();
      return { id: doc.id, ...data } as Employee;
    });
  } catch {
    throw new ServiceError(
      `Could not retrieve employees from ${department} department`
    );
  }
};
