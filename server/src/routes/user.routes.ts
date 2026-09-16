import express from "express";
import {
  createUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);

export default router;
