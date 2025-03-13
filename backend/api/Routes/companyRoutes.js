"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const companyController_1 = require("../Controllers/companyController");
const authMiddleware_1 = require("../Middleware/authMiddleware"); // ✅ Check case sensitivity
const multerMiddleware_1 = __importDefault(require("../Middleware/multerMiddleware"));
router.post("/uploadlogo", authMiddleware_1.protect, multerMiddleware_1.default.single("companyLogo"), companyController_1.uploadCompanyLogo);
router.post("/register", authMiddleware_1.protect, companyController_1.registerCompany);
router.get("/getcompanydetail", authMiddleware_1.protect, companyController_1.getCompany);
exports.default = router;
//# sourceMappingURL=companyRoutes.js.map