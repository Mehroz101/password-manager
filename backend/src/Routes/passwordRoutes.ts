import express from "express";
import {
  AddAndUpdatePassword,
  getAllPasswords,
  DeletePassword,
  GetSpecificPassword,
  RecentActivities,
  DynamicPasswordStore,
} from "../Controllers/passwordController";
import { protect } from "../Middleware/authMiddleware";

const router = express.Router();

// router.post("/addpassword", protect, AddAndUpdatePassword); 
router.post("/addandupdatepassword", protect, DynamicPasswordStore);
 
router.post("/getspecificpassword", protect, GetSpecificPassword);
 
router.post("/deletepassword", protect, DeletePassword);
 
router.get("/getallpasswords", protect, getAllPasswords);
 
router.get("/getrecentactivities", protect, RecentActivities);

export default router;
