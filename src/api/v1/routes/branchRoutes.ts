/**
 * Branch Routes (branchRoutes.ts)
 *
 * This file defines the routes for managing branches in our application.
 * It uses the Express framework for routing and makes calls to the branch controller
 * (branchController.ts) to handle the logic for each route.
 */

import express, { Router } from "express";
import * as branchController from "../controllers/branchControllers";

const router: Router = express.Router();

/**
 * @route POST /
 * @description Creates a new branch
 *
 * @openapi
 * /api/v1/branches:
 *   post:
 *     summary: creates a new branch
 *     tags: [Branch]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: the new branch that was created
 *
 */
router.post("/", branchController.createBranch);

/**
 * @route GET /
 * @description Gets all branches
 *
 * @openapi
 * /api/v1/branches:
 *   get:
 *     summary: Gets all existing branches
 *     tags: [Branch]
 *     responses:
 *       200:
 *         description: the branches retrieved
 */
router.get("/", branchController.getAllBranches);

/**
 * @route GET /:id
 * @description Gets a branch with corresponding id
 *
 * @openapi
 * /api/v1/branches/{id}:
 *   get:
 *     summary: Gets branch with corresponding id
 *     tags: [Branch]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: id of the branch to retrieve
 *     responses:
 *       200:
 *         description: the branch with the corresponding id
 */
router.get("/:id", branchController.getBranchById);

/**
 * @route PUT /:id
 * @description Updates an existing branch
 *
 * @openapi
 * /api/v1/branches/{id}:
 *   put:
 *     summary: updates an existing branch
 *     tags: [Branch]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: id of the branch to be updated
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: the updated branch
 */
router.put("/:id", branchController.updateBranch);

/**
 * @route DELETE /:id
 * @description Deletes a branch
 *
 * @openapi
 * /api/v1/branches/{id}:
 *   delete:
 *     summary: deletes an existing branch
 *     tags: [Branch]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: id of the branch to be deleted
 *     responses:
 *       200:
 *         description: branch deleted
 */
router.delete("/:id", branchController.deleteBranch);

export default router;
