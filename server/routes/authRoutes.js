import express from "express";
import { addTask, deleteTask, getMyTask, login, signup, updateTask } from "../controller/authcontroller.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.get("/mytask",authMiddleware, getMyTask);
router.post("/mytask",authMiddleware, addTask);
router.put("/mytask/:taskId", authMiddleware, updateTask);
router.delete("/mytask/:taskId", authMiddleware, deleteTask);

export default router;


