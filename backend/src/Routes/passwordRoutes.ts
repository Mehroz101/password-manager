import express from "express";
import { AddAndUpdatePassword, getAllPasswords ,DeletePassword} from "../Controllers/passwordController";
import { protect } from "../Middleware/authMiddleware";

const router = express.Router();

router.post("/addandupdatepassword", protect, AddAndUpdatePassword);
router.post("/deletepassword", protect, DeletePassword);
router.get("/getallpasswords", protect, getAllPasswords);

export default router;
