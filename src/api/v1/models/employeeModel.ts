/**
 * @interface Employee
 * @description Represents an employee object
 *
 * @openapi
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for an employee
 *         name:
 *           type: string
 *           description: Name of an employee
 *         position:
 *           type: string
 *           description: Job position of an employee
 *         department:
 *           type: string
 *           description: Department where an employee works
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of an employee
 *         phone:
 *           type: string
 *           description: Phone number of an employee
 *         branch:
 *           type: string
 *           description: Unique identifier of the branch the employee works at
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
