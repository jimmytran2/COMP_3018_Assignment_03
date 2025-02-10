import express, { Express } from "express";
import morgan from "morgan";
import employeeRoutes from "./api/v1/routes/employeeRoutes";
import branchRoutes from "./api/v1/routes/branchRoutes";
import setupSwagger from "../config/swagger";

const app: Express = express();

setupSwagger(app);

app.use(morgan("combined"));
app.use(express.json());

// define GET route for health check
/**
 * @openapi
 * /api/v1/health:
 *  get:
 *   summary: Get health status of the application
 *   tags: [Health]
 *   responses:
 *    200:
 *     description: The application's status, uptime, the current timestamp, and version
 */
app.get("/api/v1/health", (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

app.get("/health", (req, res) => {
  res.status(200);
  res.send("Server is healthy");
});

app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/branches", branchRoutes);

export default app;
