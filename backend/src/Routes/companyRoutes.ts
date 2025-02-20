import express from "express";
const router = express.Router();
import {
  getCompany,
  registerCompany,
  uploadCompanyLogo,
} from "../Controllers/companyController";
import { protect } from "../Middleware/authMiddleware"; // ✅ Check case sensitivity
import upload from "../Middleware/multerMiddleware";

router.post(
  "/uploadlogo",
  protect,
  upload.single("companyLogo"),
  uploadCompanyLogo
);
router.post("/register", protect, registerCompany);
router.get("/getcompanydetail", protect, getCompany);
export default router;
