/**
 * @interface Branch
 * @description Represents a branch object
 *
 * @openapi
 * components:
 *   schemas:
 *     Branch:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for a branch
 *         name:
 *           type: string
 *           description: Name of a branch
 *         address:
 *           type: string
 *           description: Address of a branch
 *         phone:
 *           type: string
 *           description: Phone number of a branch
 */
export type Branch = {
  id: string;
  name: string;
  address: string;
  phone: string;
};
