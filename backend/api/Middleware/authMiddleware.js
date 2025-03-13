"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const protect = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Unauthorized: No token provided" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id }; // ✅ Ensure `req.user` is always set
        next();
    }
    catch (error) {
        res.status(401).json({ success: false, message: "Invalid token" });
        return;
    }
};
exports.protect = protect;
//# sourceMappingURL=authMiddleware.js.map