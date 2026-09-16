import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json("User Management Application server!!");
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend is running...",
  });
});

app.use("/api/users", userRoutes);

export default app;
