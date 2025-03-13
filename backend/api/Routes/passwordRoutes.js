"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passwordController_1 = require("../Controllers/passwordController");
const authMiddleware_1 = require("../Middleware/authMiddleware");
const router = express_1.default.Router();
router.post("/addandupdatepassword", authMiddleware_1.protect, passwordController_1.AddAndUpdatePassword);
router.post("/getspecificpassword", authMiddleware_1.protect, passwordController_1.GetSpecificPassword);
router.post("/deletepassword", authMiddleware_1.protect, passwordController_1.DeletePassword);
router.get("/getallpasswords", authMiddleware_1.protect, passwordController_1.getAllPasswords);
router.get("/getrecentactivities", authMiddleware_1.protect, passwordController_1.RecentActivities);
exports.default = router;
//# sourceMappingURL=passwordRoutes.js.map