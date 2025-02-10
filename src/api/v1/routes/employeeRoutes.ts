/**
 * Employee Routes (employeeRoutes.ts)
 *
 * This file defines the routes for managing employee in our application.
 * It uses the Express framework for routing and makes calls to the employee controller
 * (employeeController.ts) to handle the logic for each route.
 */

import express, { Router } from "express";
import * as employeeController from "../controllers/employeeControllers";

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
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               position:
 *                 type: string
 *               department:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               branch:
 *                 type: number
 *     responses:
 *       201:
 *         description: the new employee that was created
 */
router.post("/", employeeController.createEmployee);

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
 *           type: number
 *         required: true
 *         description: id of the employee to retrieve
 *     responses:
 *       200:
 *         description: the employee with the corresponding id
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
 *           type: number
 *         required: true
 *         description: id of the employee to be updated
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               position:
 *                 type: string
 *               department:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               branch:
 *                 type: number
 *     responses:
 *       200:
 *         description: the updated employee
 */
router.put("/:id", employeeController.updateEmployee);

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
 *         required: true
 *         description: id of the employee to be deleted
 *     responses:
 *       200:
 *         description: employee deleted
 */
router.delete("/:id", employeeController.deleteEmployee);

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
 *         required: true
 *         description: id of the branch to retrieve employees from
 *     responses:
 *       200:
 *         description: the employees from the branch
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
 */
router.get(
  "/departments/:department",
  employeeController.getEmployeeByDepartment
);

export default router;
