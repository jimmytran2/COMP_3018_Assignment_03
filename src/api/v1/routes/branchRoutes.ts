/**
 * Branch Routes (branchRoutes.ts)
 *
 * This file defines the routes for managing branches in our application.
 * It uses the Express framework for routing and makes calls to the branch controller
 * (branchController.ts) to handle the logic for each route.
 */

import express, { Router } from "express";
import * as branchController from "../controllers/branchControllers";
import { validateRequest } from "../middleware/validate";
import {
  branchSchema,
  deleteBranchSchema,
} from "../validation/branchValidation";

const router: Router = express.Router();

/**
 * @route POST /
 * @description Creates a new branch
 *
 * @openapi
 * /api/v1/branches:
 *   post:
 *     summary: Creates a new branch
 *     tags: [Branch]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Branch'
 *           example:
 *             id: "123"
 *             name: "Montreal"
 *             address: "123 French St"
 *             phone: "1234567890"
 *     responses:
 *       201:
 *         description: The new branch was created
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
 *                     $ref: '#/components/schemas/Branch'
 *                 message:
 *                   type: string
 *             example:
 *                 status: "success"
 *                 data:
 *                   id: "123"
 *                   name: "Montreal"
 *                   address: "123 French St"
 *                   phone: "1234567890"
 *                 message: "Branch created"
 *       400:
 *         description: Invalid inputs
 *       500:
 *         description: Internal Server Error
 */
router.post("/", validateRequest(branchSchema), branchController.createBranch);

/**
 * @route GET /
 * @description Gets all existing branches
 *
 * @openapi
 * /api/v1/branches:
 *   get:
 *     summary: Gets all existing branches
 *     tags: [Branch]
 *     responses:
 *       200:
 *         description: A list of all the branches retrieved
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
 *                     $ref: '#/components/schemas/Branch'
 *                 message:
 *                   type: string
 *             example:
 *                 status: "success"
 *                 data:
 *                   - id: "HvbwzmVBkqAkove68KUs"
 *                     name: "calgary"
 *                     address: "123 rainbow St"
 *                     phone: "1234567890"
 *                   - id: "V01OXjtQowI8GnenrAZq"
 *                     name: "vancouver"
 *                     address: "123 Smith St"
 *                     phone: "1234567890"
 *                 message: "Branches retrieved"
 *       500:
 *         description: Internal Server Error
 */
router.get("/", branchController.getAllBranches);

/**
 * @route GET /:id
 * @description Gets a branch by id
 *
 * @openapi
 * /api/v1/branches/{id}:
 *   get:
 *     summary: Gets branch by id
 *     tags: [Branch]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: "123abc"
 *         required: true
 *         description: id of the branch to retrieve
 *     responses:
 *       200:
 *         description: the branch with the corresponding id
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
 *                     $ref: '#/components/schemas/Branch'
 *                 message:
 *                   type: string
 *             example:
 *                 status: "success"
 *                 data:
 *                   - id: "123abc"
 *                     name: "Winnipeg"
 *                     address: "123 Main St"
 *                     phone: "1234567890"
 *                 message: "Branch retrieved"
 *       500:
 *         description: Internal Server Error
 */
router.get("/:id", branchController.getBranchById);

/**
 * @route PUT /:id
 * @description Updates an existing branch
 *
 * @openapi
 * /api/v1/branches/{id}:
 *   put:
 *     summary: Updates an existing branch
 *     tags: [Branch]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: "123abc"
 *         required: true
 *         description: id of the branch to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Branch'
 *           example:
 *             id: "123"
 *             name: "Montreal"
 *             address: "123 French St"
 *             phone: "1234567890"
 *     responses:
 *       200:
 *         description: the updated branch
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
 *                     $ref: '#/components/schemas/Branch'
 *                 message:
 *                   type: string
 *             example:
 *                 status: "success"
 *                 data:
 *                   - id: "123abc"
 *                     name: "Winnipeg"
 *                     address: "123 Main St"
 *                     phone: "1234567890"
 *                 message: "Branch updated"
 *       400:
 *         description: Invalid inputs
 *       500:
 *         description: Internal Server Error
 */
router.put(
  "/:id",
  validateRequest(branchSchema),
  branchController.updateBranch
);

/**
 * @route DELETE /:id
 * @description Deletes an existing branch
 *
 * @openapi
 * /api/v1/branches/{id}:
 *   delete:
 *     summary: Deletes an existing branch
 *     tags: [Branch]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: "123abc"
 *         required: true
 *         description: id of the branch to be deleted
 *     responses:
 *       200:
 *         description: branch deleted
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
 *                 status: "success"
 *                 message: "Branch delete"
 *       500:
 *         description: Internal Server Error
 */
router.delete(
  "/:id",
  validateRequest(deleteBranchSchema),
  branchController.deleteBranch
);

export default router;
