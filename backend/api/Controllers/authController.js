"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../Models/User"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password: plainPassword } = req.body;
        const existingUser = yield User_1.default.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            res.status(400).json({
                success: false,
                message: `Username ${username} or email ${email} already exists`,
            });
        }
        else {
            const hashedPassword = yield bcryptjs_1.default.hash(plainPassword, 10);
            const nextUserID = yield User_1.default.findOne().sort({ userID: -1 });
            const userID = nextUserID ? nextUserID.userID + 1 : 1;
            const user = new User_1.default({
                username,
                email,
                password: hashedPassword,
                userID: userID,
            });
            yield user.save();
            res.status(201).json({
                success: true,
                message: "User registered successfully",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Registration failed",
            error,
        });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Check if the user exists
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            res.status(401).json({ success: false, message: "Invalid credentials" });
            return;
        }
        // Compare password
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ success: false, message: "Invalid credentials" });
            return;
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "10day",
        });
        res.json({ success: true, message: "Login successful", token: token });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Login failed", error });
    }
});
exports.loginUser = loginUser;
//# sourceMappingURL=authController.js.map