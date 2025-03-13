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
exports.RecentActivities = exports.GetSpecificPassword = exports.DeletePassword = exports.getAllPasswords = exports.AddAndUpdatePassword = void 0;
const Password_1 = __importDefault(require("../Models/Password"));
const User_1 = __importDefault(require("../Models/User"));
const RecentActivity_1 = __importDefault(require("../Models/RecentActivity"));
const AddAndUpdatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.user) {
            const userID = req.user.id;
            const { appName, username = "", email = "", password, url: webUrl = "", categoryType, categoryName, passwordID = null, } = req.body;
            const ImgURL = `http://localhost:5000/uploads/${categoryName}.png`;
            if (passwordID) {
                const passwordData = yield Password_1.default.findOne({ passwordID });
                // const EditDate = new Date();
                if (passwordData) {
                    // if (categoryName === passwordData.categoryName) {
                    //   passwordData.appName = appName;
                    //   passwordData.username = username;
                    //   passwordData.email = email;
                    //   passwordData.password = password;
                    //   passwordData.webUrl = webUrl;
                    //   passwordData.passwordImg = ImgURL;
                    //   passwordData.lastAction.actionType = "Last Edited";
                    //   passwordData.lastAction.actionDateTime = EditDate;
                    //   passwordData.categoryType = "Social";
                    //   await passwordData.save();
                    //   res.status(200).json({
                    //     success: true,
                    //     message: "Password updated successfully",
                    //   });
                    // } else {
                    const EditDate = new Date();
                    passwordData.lastAction.actionType = "Last Edited";
                    passwordData.lastAction.actionDateTime = EditDate;
                    passwordData.categoryType = categoryType;
                    passwordData.appName = appName;
                    passwordData.username = username;
                    passwordData.email = email;
                    passwordData.password = password;
                    passwordData.webUrl = webUrl;
                    passwordData.categoryName = categoryName;
                    passwordData.passwordImg = ImgURL;
                    const passwordid = yield passwordData.save();
                    const Userid = yield User_1.default.findOne({ _id: userID });
                    yield RecentActivity_1.default.findOneAndUpdate({
                        userID: Userid === null || Userid === void 0 ? void 0 : Userid.userID,
                        passwordID: passwordid._id,
                        actionType: "Last Edited",
                    }, // Find existing entry
                    { updatedAt: new Date() }, // Update timestamp (or add additional fields)
                    { upsert: true, new: true } // Create if not exists, return the updated doc
                    );
                    res.status(200).json({
                        success: true,
                        message: "Password updated successfully",
                    });
                    // }
                }
                else {
                    res
                        .status(404)
                        .json({ success: true, message: "Password not found" });
                }
            }
            else {
                const previousPasswordID = yield Password_1.default.findOne().sort({
                    passwordID: -1,
                });
                const nextPasswordID = previousPasswordID
                    ? previousPasswordID.passwordID + 1
                    : 1;
                const userId = yield User_1.default.findOne({ _id: userID });
                if (!userId) {
                    res
                        .status(401)
                        .json({ success: true, message: "unauthorized login again" });
                }
                else {
                    const passwordData = new Password_1.default({
                        appName,
                        username,
                        email,
                        password,
                        webUrl,
                        categoryName,
                        categoryType,
                        userID: userId === null || userId === void 0 ? void 0 : userId.userID,
                        passwordImg: ImgURL,
                        passwordID: nextPasswordID,
                        lastAction: {
                            actionType: "Created At",
                            actionDateTime: new Date(),
                        },
                    });
                    const passwordid = yield passwordData.save();
                    yield RecentActivity_1.default.findOneAndUpdate({
                        userID: userId === null || userId === void 0 ? void 0 : userId.userID,
                        passwordID: passwordid._id,
                        actionType: "Created At",
                    }, // Find existing entry
                    { updatedAt: new Date() }, // Update timestamp (or add additional fields)
                    { upsert: true, new: true } // Create if not exists, return the updated doc
                    );
                    res.status(200).json({
                        success: true,
                        message: "Password added successfully",
                    });
                }
            }
        }
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ success: false, message: "Error adding password", error });
    }
});
exports.AddAndUpdatePassword = AddAndUpdatePassword;
const getAllPasswords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401).json({ success: false, message: "Unauthorized" });
        }
        else {
            const user = yield User_1.default.findOne({ _id: req.user.id });
            if (!user) {
                res.status(404).json({ success: false, message: "User not found" });
            }
            else {
                const passwords = yield Password_1.default.find({ userID: user.userID });
                res.status(200).json({ success: true, message: "", data: passwords });
            }
        }
    }
    catch (error) {
        console.error("Error fetching passwords:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});
exports.getAllPasswords = getAllPasswords;
const DeletePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401).json({ success: false, message: "Unauthorized" });
        }
        else {
            const { passwordID } = req.body;
            console.log(req.body);
            if (!passwordID) {
                res
                    .status(400)
                    .json({ success: false, message: "Password ID is required" });
            }
            else {
                const userID = yield User_1.default.findOne({ _id: req.user.id });
                if (!userID) {
                    return;
                }
                const passwordDoc = yield Password_1.default.findOne({
                    passwordID: passwordID, // Search by custom passwordID field
                    userID: userID === null || userID === void 0 ? void 0 : userID.userID, // Ensure it's linked to the correct user
                });
                const deletedPassword = yield Password_1.default.deleteOne({
                    _id: passwordDoc === null || passwordDoc === void 0 ? void 0 : passwordDoc._id
                });
                yield RecentActivity_1.default.deleteMany({
                    passwordID: passwordDoc === null || passwordDoc === void 0 ? void 0 : passwordDoc._id, // Use the actual _id of the password
                });
                if (!deletedPassword) {
                    res
                        .status(404)
                        .json({ success: false, message: "Password not found" });
                }
                else {
                    res
                        .status(200)
                        .json({ success: true, message: "Password deleted successfully" });
                }
            }
        }
    }
    catch (error) {
        console.error("Error deleting password:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});
exports.DeletePassword = DeletePassword;
const GetSpecificPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401).json({ success: false, message: "Unauthorized" });
        }
        else {
            const { passwordID } = req.body;
            if (!passwordID) {
                res
                    .status(400)
                    .json({ success: false, message: "Password ID is required" });
            }
            else {
                const userID = yield User_1.default.findOne({ _id: req.user.id });
                if (!userID) {
                    return;
                }
                const passwordData = yield Password_1.default.findOne({
                    passwordID: passwordID,
                    userID: userID === null || userID === void 0 ? void 0 : userID.userID,
                });
                if (!passwordData) {
                    res
                        .status(404)
                        .json({ success: false, message: "Password not found" });
                }
                else {
                    yield RecentActivity_1.default.findOneAndUpdate({
                        userID: userID === null || userID === void 0 ? void 0 : userID.userID,
                        passwordID: passwordData._id,
                        actionType: "Last Viewed",
                    }, // Find existing entry
                    { updatedAt: new Date() }, // Update timestamp (or add additional fields)
                    { upsert: true, new: true } // Create if not exists, return the updated doc
                    );
                    res
                        .status(200)
                        .json({ success: true, message: "", data: passwordData });
                }
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.GetSpecificPassword = GetSpecificPassword;
const RecentActivities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.user) {
            const userID = yield User_1.default.findOne({ _id: req.user.id });
            const recentActivities = yield RecentActivity_1.default.find({
                userID: userID === null || userID === void 0 ? void 0 : userID.userID,
            }).populate("passwordID");
            res
                .status(200)
                .json({ success: true, message: "", data: recentActivities });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});
exports.RecentActivities = RecentActivities;
//# sourceMappingURL=passwordController.js.map