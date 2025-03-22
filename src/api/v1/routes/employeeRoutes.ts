/**
 * Employee Routes (employeeRoutes.ts)
 *
 * This file defines the routes for managing employee in our application.
 * It uses the Express framework for routing and makes calls to the employee controller
 * (employeeController.ts) to handle the logic for each route.
 */

import express, { Router } from "express";
import * as employeeController from "../controllers/employeeControllers";
import { validateRequest } from "../middleware/validate";
import {
  employeeSchema,
  deleteEmployeeSchema,
} from "../validation/employeeValidation";

const router: Router = express.Router();

/**
 * @route POST /
 * @description Creates a new employee
 *
 * @openapi
 * /api/v1/employees:
 *   post:
 *     summary: Creates a new employee
 *     tags: [Employee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: 'component/schemas/Employee'
 *           example:
 *             id: "eK4HyF5P542xK3hriGH7"
 *             name: "Michael Scott"
 *             position: "Manager"
 *             department: "Paper"
 *             email: "mscott@rrc.academic.com"
 *             phone: "1231231231"
 *             branch: "5"
 *     responses:
 *       201:
 *         description: the new employee that was created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   items:
 *                     $ref: '#/components/schemas/Employee'
 *                 message:
 *                   type: string
 *             example:
 *               successResponse:
 *                 value:
 *                   status: "success"
 *                   data:
 *                     id: "eK4HyF5P542xK3hriGH7"
 *                     name: "Michael Scott"
 *                     position: "Manager"
 *                     department: "Paper"
 *                     email: "mscott@rrc.academic.com"
 *                     phone: "1231231231"
 *                     branch: "5"
 *                   message: "Branch created"
 *       400:
 *         description: Invalid inputs
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/",
  validateRequest(employeeSchema),
  employeeController.createEmployee
);

/**
 * @route GET /
 * @description Gets all employees
 *
 * @openapi
 * /api/v1/employees:
 *   get:
 *     summary: Gets all existing employees
 *     tags: [Employee]
 *     responses:
 *       200:
 *         description: the employees retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   items:
 *                     $ref: '#/components/schemas/Employee'
 *                 message:
 *                   type: string
 *             example:
 *               successResponse:
 *                 value:
 *                   status: "success"
 *                   data:
 *                     - id: "eK4HyF5P542xK3hriGH7"
 *                       name: "Michael Scott"
 *                       position: "Manager"
 *                       department: "Paper"
 *                       email: "mscott@rrc.academic.com"
 *                       phone: "1231231231"
 *                       branch: "5"
 *                     - id: "CPoRjmYPHjXLUDpyDxMA"
 *                       name: "Jimmy Tran"
 *                       position: "Help Desk"
 *                       department: "Finance"
 *                       email: "jimmy@rrc.academic.com"
 *                       phone: "1234567890"
 *                       branch: "1"
 *                   message: "Employees retrieved"
 *       500:
 *         description: Internal Server Error
 */
router.get("/", employeeController.getAllEmployees);

/**
 * @route GET /:id
 * @description Gets an employee with corresponding id
 *
 * @openapi
 * /api/v1/employees/{id}:
 *   get:
 *     summary: Gets employee with corresponding id
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: "123abc"
 *         required: true
 *         description: id of the employee to retrieve
 *     responses:
 *       200:
 *         description: the employee with the corresponding id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   items:
 *                     $ref: '#/components/schemas/Employee'
 *                 message:
 *                   type: string
 *             example:
 *               successResponse:
 *                 value:
 *                   status: "success"
 *                   data:
 *                     - id: "eK4HyF5P542xK3hriGH7"
 *                       name: "Michael Scott"
 *                       position: "Manager"
 *                       department: "Paper"
 *                       email: "mscott@rrc.academic.com"
 *                       phone: "1231231231"
 *                   message: "Employee retrieved"
 *       500:
 *         description: Internal Server Error
 */
router.get("/:id", employeeController.getEmployeeById);

/**
 * @route PUT /:id
 * @description Updates an existing employee
 *
 * @openapi
 * /api/v1/employees/{id}:
 *   put:
 *     summary: updates an existing employee
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: "123abc"
 *         required: true
 *         description: id of the employee to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: 'component/schemas/Employee'
 *           example:
 *             id: "eK4HyF5P542xK3hriGH7"
 *             name: "Michael Scott"
 *             position: "Manager"
 *             department: "Paper"
 *             email: "mscott@rrc.academic.com"
 *             phone: "1231231231"
 *             branch: "5"
 *     responses:
 *       200:
 *         description: the updated employee
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   items:
 *                     $ref: '#/components/schemas/Employee'
 *                 message:
 *                   type: string
 *             example:
 *               successResponse:
 *                 value:
 *                   status: "success"
 *                   data:
 *                     id: "eK4HyF5P542xK3hriGH7"
 *                     name: "Michael Scott"
 *                     position: "Manager"
 *                     department: "Paper"
 *                     email: "mscott@rrc.academic.com"
 *                     phone: "1231231231"
 *                     branch: "5"
 *                   message: "Employee updated"
 *       400:
 *         description: Invalid inputs
 *       500:
 *         description: Internal Server Error
 */
router.put(
  "/:id",
  validateRequest(employeeSchema),
  employeeController.updateEmployee
);

/**
 * @route DELETE /:id
 * @description Deletes an employee
 *
 * @openapi
 * /api/v1/employeees/{id}:
 *   delete:
 *     summary: deletes an existing employee
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *           example: "123abc"
 *         required: true
 *         description: id of the employee to be deleted
 *     responses:
 *       200:
 *         description: employee deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *             example:
 *               successResponse:
 *                 value:
 *                   status: "success"
 *                   message: "Employee delete"
 *       500:
 *         description: Internal Server Error
 */
router.delete(
  "/:id",
  validateRequest(deleteEmployeeSchema),
  employeeController.deleteEmployee
);

/**
 * @route GET /branches/:branch
 * @description Gets all employees from a branch
 *
 * @openapi
 * /api/v1/employees/branches/{branch}:
 *   get:
 *     summary: Gets employees from a particular branch
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: branch
 *         schema:
 *           type: string
 *           example: "2"
 *         required: true
 *         description: id of the branch to retrieve employees from
 *     responses:
 *       200:
 *         description: the employees from the branch
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   items:
 *                     $ref: '#/components/schemas/Employee'
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 */
router.get("/branches/:branch", employeeController.getEmployeeByBranch);

/**
 * @route GET /departments/:department
 * @description Gets all employees from a department
 *
 * @openapi
 * /api/v1/employees/departments/{department}:
 *   get:
 *     summary: Gets employees from a particular department
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: department
 *         schema:
 *           type: string
 *         required: true
 *         description: name of the department to retrieve employees from
 *     responses:
 *       200:
 *         description: the employees from the department
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   items:
 *                     $ref: '#/components/schemas/Employee'
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/departments/:department",
  employeeController.getEmployeeByDepartment
);

export default router;
