import express from "express";
import routes from "./routes";

const app = express();

// Add middleware to parse JSON requests
app.use(express.json());

// Register the routes
app.use("/api", routes);

// ...

export default app;
