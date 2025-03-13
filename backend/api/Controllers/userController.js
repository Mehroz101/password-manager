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
exports.UpdateProfileImg = exports.UpdateUserDetail = exports.GetUserProfileDetail = exports.GetUserProfileData = void 0;
const User_1 = __importDefault(require("../Models/User"));
const Password_1 = __importDefault(require("../Models/Password"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const fs_1 = __importDefault(require("fs"));
const GetUserProfileData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.user) {
            const user = yield User_1.default.findOne({ _id: req.user.id });
            if (user) {
                const passwords = yield Password_1.default.find({ userID: user.userID });
                const sendData = {
                    user: user,
                    passwords: passwords === null || passwords === void 0 ? void 0 : passwords.length,
                };
                res.status(200).json({
                    success: true,
                    data: sendData,
                });
            }
        }
    }
    catch (error) {
        res.status(500).json({
            success: true,
            message: "Internal server error",
        });
    }
});
exports.GetUserProfileData = GetUserProfileData;
const GetUserProfileDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.user) {
            const user = yield User_1.default.findOne({ _id: req.user.id });
            if (user) {
                res.status(200).json({
                    success: true,
                    data: user,
                });
            }
        }
    }
    catch (error) {
    }
});
exports.GetUserProfileDetail = GetUserProfileDetail;
const UpdateUserDetail = (req, // Ensure req.user is typed correctly
res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        // Check if the user is authenticated
        if (req.user) {
            const { username, fullname, password, nPassword } = req.body;
            // Find the user by ID
            const user = yield User_1.default.findById(req.user.id);
            if (user) {
                // Check if both password fields are provided
                if (password && nPassword) {
                    // Check if the new username already exists
                    const isUsernameExist = (yield User_1.default.findOne({
                        username,
                    }));
                    if (!isUsernameExist ||
                        ((_b = (_a = isUsernameExist === null || isUsernameExist === void 0 ? void 0 : isUsernameExist._id) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "") === req.user.id) {
                        // Verify the old password
                        const isVerified = yield bcryptjs_1.default.compare(password, user.password);
                        if (isVerified) {
                            // Hash the new password
                            const encryptedPassword = yield bcryptjs_1.default.hash(nPassword, 10);
                            // Update user details
                            yield User_1.default.findByIdAndUpdate(req.user.id, {
                                username,
                                fullname,
                                password: encryptedPassword,
                            });
                            // Respond with success
                            res.status(200).json({
                                success: true,
                                message: "Details updated successfully",
                            });
                        }
                        else {
                            // Incorrect password
                            res
                                .status(401)
                                .json({ success: false, message: "Incorrect password" });
                        }
                    }
                    else {
                        // Username already exists
                        res
                            .status(400)
                            .json({ success: false, message: "Username already exists" });
                    }
                }
                else {
                    // Password fields are required
                    res
                        .status(400)
                        .json({ success: false, message: "Password fields are required" });
                }
            }
            else {
                // User not found
                res.status(404).json({ success: false, message: "User  not found" });
            }
        }
        else {
            // Unauthorized access
            res.status(401).json({ success: false, message: "Unauthorized" });
        }
    }
    catch (error) {
        console.error("Error updating user details:", error); // Log the error for debugging
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
exports.UpdateUserDetail = UpdateUserDetail;
const UpdateProfileImg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(req === null || req === void 0 ? void 0 : req.file)) {
            res.status(400).json({ success: false, message: "No file uploaded" });
        }
        else {
            console.log("entered in file: ", req.file);
            const file = req === null || req === void 0 ? void 0 : req.file;
            if (!req.user) {
                res.status(401).json({ success: false, message: "Unauthorized" });
            }
            else {
                const userID = req.user.id;
                const user = yield User_1.default.findOne({ _id: userID });
                if (!user) {
                    res
                        .status(404)
                        .json({ success: false, message: "First Create an Account" });
                }
                else {
                    if (user.profileImg) {
                        console.log("logofound");
                        const previousImg = user.profileImg;
                        const filePath = `./uploads/${previousImg}`;
                        if (fs_1.default.existsSync(filePath)) {
                            fs_1.default.unlinkSync(filePath);
                        }
                    }
                    user.profileImg = file === null || file === void 0 ? void 0 : file.filename;
                    yield user.save();
                    res.status(200).json({
                        success: true,
                        message: "Profile image uploaded successfully",
                        user,
                    });
                }
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: true,
            message: "Internal server error",
        });
    }
});
exports.UpdateProfileImg = UpdateProfileImg;
//# sourceMappingURL=userController.js.map