import express  from "express";
import { protect } from "../Middleware/authMiddleware";
import { GetUserProfileData, UpdateUserDetail ,GetUserProfileDetail} from "../Controllers/userController";

const router = express.Router()

router.get("/userprofiledata",protect,GetUserProfileData)
router.get("/userprofiledetail",protect,GetUserProfileDetail)
router.post("/updateuserdetail",protect,UpdateUserDetail)


export default router