/**
 * Employee Controller (employeeController.ts)
 *
 * This file defines controllers for handling requests and responses related to employees.
 * The controllers interact with the employee services to performance logic for
 * CRUD operations on the employee
 */

import { Request, Response, NextFunction } from "express";
import * as employeeService from "../services/employeeServices";
import type { Employee } from "../services/employeeServices";

/**
 * @description Create a new employee
 * @route POST /
 * @returns {Promise<void>}
 */
export const createEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const newEmployee: Employee = await employeeService.createEmployee(
      req.body
    );
    res.status(201).json({ message: "Employee created", data: newEmployee });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Get all employees
 * @route GET /
 * @returns {Promise<void>}
 */
export const getAllEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const employees: Employee[] = await employeeService.getAllEmployees();
    res.status(200).json({ message: "Employees retrieved", data: employees });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Get employee with corresponding id
 * @route GET /:id
 * @returns {Promise<void>}
 */
export const getEmployeeById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const employee: Employee = await employeeService.getEmployeeById(
      Number(req.params.id)
    );
    res.status(200).json({ message: "Employee retrieved", data: employee });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Update an existing employee
 * @route PUT /:id
 * @returns {Promise<void>}
 */
export const updateEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const updatedEmployee: Employee = await employeeService.updateEmployee(
      Number(req.params.id),
      req.body
    );

    res
      .status(200)
      .json({ message: "Employee updated", data: updatedEmployee });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Delete an employee
 * @route DELETE /:id
 * @returns {Promise<void>}
 */
export const deleteEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await employeeService.deleteEmployee(Number(req.params.id));
    res.status(200).json({ message: "Employee deleted" });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Get employees from a branch
 * @route GET /branches/:branch
 * @returns {Promise<void>}
 */
export const getEmployeeByBranch = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const employees: Employee[] = await employeeService.getEmployeeByBranch(
      Number(req.params.branch)
    );
    res
      .status(200)
      .json({ message: "Employees from branch retrieved", data: employees });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Get employees from a department
 * @route GET /departments/:department
 * @returns {Promise<void>}
 */
export const getEmployeeByDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const employees: Employee[] = await employeeService.getEmployeeByDepartment(
      req.params.department
    );
    res.status(200).json({
      message: "Employees from department retrieved",
      data: employees,
    });
  } catch (error) {
    next(error);
  }
};
