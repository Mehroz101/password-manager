"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../Middleware/authMiddleware");
const userController_1 = require("../Controllers/userController");
const multerMiddleware_1 = __importDefault(require("../Middleware/multerMiddleware"));
const router = express_1.default.Router();
router.get("/userprofiledata", authMiddleware_1.protect, userController_1.GetUserProfileData);
router.get("/userprofiledetail", authMiddleware_1.protect, userController_1.GetUserProfileDetail);
router.post("/updateuserdetail", authMiddleware_1.protect, userController_1.UpdateUserDetail);
router.post("/updateprofileimg", authMiddleware_1.protect, multerMiddleware_1.default.single("profileImg"), userController_1.UpdateProfileImg);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map