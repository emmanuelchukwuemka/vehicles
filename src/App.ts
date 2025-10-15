import express, { Application } from "express";
import loaders from "./loaders";

const app: Application = express();

// Health check endpoint for Render
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// Health check endpoint for Render (alternative)
app.get("/healthz", (req, res) => {
  res.status(200).json({ status: "healthy", timestamp: new Date().toISOString() });
});

(async () => {
  await loaders(app);
})();

export default app;