import express from "express";
import { AddAndUpdatePassword, getAllPasswords ,DeletePassword,GetSpecificPassword} from "../Controllers/passwordController";
import { protect } from "../Middleware/authMiddleware";

const router = express.Router();

router.post("/addandupdatepassword", protect, AddAndUpdatePassword);
router.post("/getspecificpassword", protect, GetSpecificPassword);
router.post("/deletepassword", protect, DeletePassword);
router.get("/getallpasswords", protect, getAllPasswords);

export default router;
