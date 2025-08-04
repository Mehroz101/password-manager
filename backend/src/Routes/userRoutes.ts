import express  from "express";
import { protect } from "../Middleware/authMiddleware";
import { GetUserProfileData, UpdateUserDetail ,GetUserProfileDetail,UpdateProfileImg} from "../Controllers/userController";
import upload from "../Middleware/multerMiddleware";

const router = express.Router()


router.get("/userprofiledata",protect,GetUserProfileData)
router.get("/userprofiledetail",protect,GetUserProfileDetail)
router.post("/updateuserdetail",protect,UpdateUserDetail)
router.post("/updateprofileimg",protect,upload.single("profileImg"),UpdateProfileImg)


export default router