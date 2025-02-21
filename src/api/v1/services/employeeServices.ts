/**
 * Employee Service (employeeServices.ts)
 *
 * This file defines functions for managing employee data.
 */

import { employeeData } from "./employeeData";
import { branchData } from "./branchData";
import { ServiceError } from "../errors/error";
import {
  createDocument,
  getDocuments,
  getDocumentById,
  getDocumentsByFieldValue,
  updateDocument,
  deleteDocument,
} from "../repositories/firestoreRepository";
import { create } from "domain";

const COLLECTION = "employees";

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

// Uses sample employee data from employeeData.ts
// const employees: Employee[] = [...employeeData];
// let newEmployeeId: number = employees.length;

/**
 * @description Create a new employee
 * @param {Partial<Employee>} employee data
 * @returns {Promise<Employee>} promise that is resolved to the employee thats created
 */
export const createEmployee = async (
  employee: Partial<Employee>
): Promise<Employee> => {
  const id: string = await createDocument(COLLECTION, employee);
  return { id, ...employee } as Employee;
};

/**
 * @description Gets all employees
 * @returns {Promise<Employee[]>} promise that is resolved to all employees that are retrieved
 */
export const getAllEmployees = async (): Promise<Employee[]> => {
  const snapshot: FirebaseFirestore.QuerySnapshot = await getDocuments(
    COLLECTION
  );

  return snapshot.docs.map((doc) => {
    const data: FirebaseFirestore.DocumentData = doc.data();
    return { id: doc.id, ...data } as Employee;
  });
};

/**
 * @description Gets employee by employee id
 * @param {string} id - unique id for an employee
 * @returns {Promise<Employee>} promise that is resolved when to the employee thats retrieved
 * @throws {Error} employee id is not found
 */
export const getEmployeeById = async (id: string): Promise<Employee> => {
  const snapshot: FirebaseFirestore.DocumentSnapshot = await getDocumentById(
    COLLECTION,
    id
  );

  const data = snapshot.data();
  return data as Employee;
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
  await updateDocument(COLLECTION, id, employee);
  return { id, ...employee } as Employee;
};

/**
 * @description Deletes an existing employee
 * @param {string} id - a unqiue id for an employee
 * @returns {Promise<void>}
 * @throws {Error} employee id is not found
 */
export const deleteEmployee = async (id: string): Promise<void> => {
  await deleteDocument(COLLECTION, id);
};

/**
 * Array filter method
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
 */
/**
 * @description Gets employees from a branch
 * @param {string} branchId - a unique id for a branch
 * @returns {Promise<Employee[]>} promise that is resolved to an array of the employees from the branch that are retrieved
 * @throws {Error} branch id is not found
 * @throws {Error} no employees associated with branch
 */
export const getEmployeeByBranch = async (
  branchId: string
): Promise<Employee[]> => {
  const snapshot: FirebaseFirestore.QuerySnapshot =
    await getDocumentsByFieldValue(COLLECTION, "branch", branchId);

  return snapshot.docs.map((doc) => {
    const data: FirebaseFirestore.DocumentData = doc.data();
    return { id: doc.id, ...data } as Employee;
  });
};

/**
 * @description Gets employees from a department
 * @param {string} department - name of the department
 * @returns {Promise<Employee[]>} promise that is resolved to an array of the employees from a department are retrieved
 * @throws {Error} department does not exist
 * @throws {Error} no employees in that department
 */
export const getEmployeeByDepartment = async (
  department: string
): Promise<Employee[]> => {
  const snapshot: FirebaseFirestore.QuerySnapshot =
    await getDocumentsByFieldValue(COLLECTION, "department", department);

  return snapshot.docs.map((doc) => {
    const data: FirebaseFirestore.DocumentData = doc.data();
    return { id: doc.id, ...data } as Employee;
  });
};
