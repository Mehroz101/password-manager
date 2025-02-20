import express from "express";
const router = express.Router();
import { registerCompany } from "../Controllers/companyController";
import { protect } from "../Middleware/authMiddleware"; // ✅ Check case sensitivity

router.post("/register", protect, registerCompany);
export default router;
