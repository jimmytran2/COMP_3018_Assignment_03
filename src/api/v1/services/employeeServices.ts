/**
 * Employee Service (employeeServices.ts)
 *
 * This file defines functions for managing employee data.
 */

import { employeeData } from "./employeeData";
import { branchData } from "./branchData";

/**
 * @interface Employee
 * @description Represents an employee object
 */
export type Employee = {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  branch: number;
};

// Uses sample employee data from employeeData.ts
const employees: Employee[] = [...employeeData];
let newEmployeeId: number = employees.length;

/**
 * @description Create a new employee
 * @param {{name: string, position: string, department: string, email: string, phone: string, branch: number}} employee - employee data
 * @returns {Promise<Employee>} promise that is resolved to the employee thats created
 */
export const createEmployee = async (employee: {
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  branch: number;
}): Promise<Employee> => {
  newEmployeeId++;
  const newEmployee: Employee = { id: newEmployeeId, ...employee };
  employees.push(newEmployee);
  return newEmployee;
};

/**
 * @description Gets all employees
 * @returns {Promise<Employee[]>} promise that is resolved to all employees that are retrieved
 */
export const getAllEmployees = async (): Promise<Employee[]> => {
  return employees;
};

/**
 * @description Gets employee by employee id
 * @param {number} id - unique id for an employee
 * @returns {Promise<Employee>} promise that is resolved when to the employee thats retrieved
 * @throws {Error} employee id is not found
 */
export const getEmployeeById = async (id: number): Promise<Employee> => {
  const index: number = employees.findIndex((i) => i.id === id);

  if (index === -1) {
    throw new Error(`Employee with ID ${id} not found`);
  }

  return employees[index];
};

/**
 * @description Updates an existing employee
 * @param {number} id - a unique id for an employee
 * @param {Partial<Employee> } employeeData - object containing employee data to be updated
 * @returns {Promise<Employee>} promise that is resolved to the employee thats been updated
 * @throws {Error} employee id is not found
 */
export const updateEmployee = async (
  id: number,
  employeeData: Partial<Employee>
): Promise<Employee> => {
  const index: number = employees.findIndex((i) => i.id === id);

  if (index === -1) {
    throw new Error(`Employee with ID ${id} not found`);
  }

  const safeEmployeeData: Partial<Employee> = { ...employeeData };
  delete safeEmployeeData.id;
  delete safeEmployeeData.name;

  employees[index] = { ...employees[index], ...safeEmployeeData };
  return employees[index];
};

/**
 * @description Deletes an existing employee
 * @param {number} id - a unqiue id for an employee
 * @returns {Promise<void>}
 * @throws {Error} employee id is not found
 */
export const deleteEmployee = async (id: number): Promise<void> => {
  const index: number = employees.findIndex((i) => i.id === id);

  if (index === -1) {
    throw new Error(`Employee with ID ${id} not found`);
  }

  employees.splice(index, 1);
};

/**
 * Array filter method
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
 */
/**
 * @description Gets employees from a branch
 * @param {number} branchId - a unique id for a branch
 * @returns {Promise<Employee[]>} promise that is resolved to an array of the employees from the branch that are retrieved
 * @throws {Error} branch id is not found
 * @throws {Error} no employees associated with branch
 */
export const getEmployeeByBranch = async (
  branchId: number
): Promise<Employee[]> => {
  const branchIndex: number = branchData.findIndex(
    (branch) => branch.id === branchId
  );

  if (branchIndex === -1) {
    throw new Error(`Branch ${branchId} does not exist`);
  }

  const employeesInBranch: Employee[] = employees.filter(
    (employee) => employee.branch === branchId
  );

  if (employeesInBranch.length === 0) {
    throw new Error(`There are no employees in branch ${branchId}`);
  }

  return employeesInBranch;
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
  const departmentIndex: number = employeeData.findIndex(
    (employee) => employee.department.toLowerCase() === department.toLowerCase()
  );

  if (departmentIndex === -1) {
    throw new Error(`${department} department does not exist`);
  }

  const employeesInDepartment: Employee[] = employees.filter(
    (employee) => employee.department.toLowerCase() === department.toLowerCase()
  );

  if (employeesInDepartment.length === 0) {
    throw new Error(`There are no employees in the ${department} department`);
  }

  return employeesInDepartment;
};
