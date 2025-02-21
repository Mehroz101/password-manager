import express from "express";
import { AddAndUpdatePassword } from "../Controllers/passwordController";
import { protect } from "../Middleware/authMiddleware";

const router = express.Router();

router.post("/addandupdatepassword", protect, AddAndUpdatePassword);

export default router;
