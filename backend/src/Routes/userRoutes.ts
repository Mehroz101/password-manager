import express  from "express";
import { protect } from "../Middleware/authMiddleware";
import { GetUserProfileData, UpdateUserDetail } from "../Controllers/userController";

const router = express.Router()

router.get("/userprofiledata",protect,GetUserProfileData)
router.post("/updateuserdetail",protect,UpdateUserDetail)


export default router