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
exports.getCompany = exports.uploadCompanyLogo = exports.registerCompany = void 0;
const Company_1 = __importDefault(require("../Models/Company"));
const User_1 = __importDefault(require("../Models/User"));
const fs_1 = __importDefault(require("fs"));
const registerCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { companyName, noOfUsers } = req.body;
        if (!req.user) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return;
        }
        let companyname = companyName.trim().toLowerCase();
        const userID = req.user.id;
        const existingCompany = yield Company_1.default.findOne({
            $or: [{ creatorID: userID }, { companyName: companyname }],
        }).populate("creatorID");
        if (existingCompany) {
            res.status(400).json({
                success: false,
                message: existingCompany.companyName === companyname
                    ? "Company name already exists"
                    : "You already have a company",
            });
        }
        else {
            const previousCompanyID = yield Company_1.default.findOne().sort({ companyID: -1 });
            const nextCompanyID = previousCompanyID
                ? previousCompanyID.companyID + 1
                : 1;
            const userId = yield User_1.default.findOne({ _id: userID });
            const UserLimit = process.env.COMPANY_USER_LIMIT || 10;
            if (userId) {
                const company = yield Company_1.default.create({
                    companyName: companyname,
                    noOfUsers: noOfUsers,
                    companyID: nextCompanyID,
                    creatorID: userID,
                    companyUserIDs: [userId.userID],
                    companyUserLimit: UserLimit,
                });
                res.status(201).json({
                    success: true,
                    message: "Company registered successfully",
                    company,
                });
            }
        }
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ success: false, message: "Error registering company", error });
    }
});
exports.registerCompany = registerCompany;
const uploadCompanyLogo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("enterd in upload");
        if (!(req === null || req === void 0 ? void 0 : req.file)) {
            res.status(400).json({ success: false, message: "No file uploaded" });
        }
        else {
            const file = req === null || req === void 0 ? void 0 : req.file;
            if (!req.user) {
                res.status(401).json({ success: false, message: "Unauthorized" });
            }
            else {
                const userID = req.user.id;
                const company = yield Company_1.default.findOne({ creatorID: userID });
                if (!company) {
                    res
                        .status(404)
                        .json({ success: false, message: "First register a company" });
                }
                else {
                    if (company.companyLogo) {
                        console.log("logofound");
                        const previousLogo = company.companyLogo;
                        const filePath = `./uploads/${previousLogo}`;
                        if (fs_1.default.existsSync(filePath)) {
                            fs_1.default.unlinkSync(filePath);
                        }
                    }
                    company.companyLogo = file === null || file === void 0 ? void 0 : file.filename;
                    yield company.save();
                    res.status(200).json({
                        success: true,
                        message: "Company logo uploaded successfully",
                        company,
                    });
                }
            }
        }
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ success: false, message: "Error uploading company logo", error });
    }
});
exports.uploadCompanyLogo = uploadCompanyLogo;
const getCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("enterd");
        if (req.user) {
            const userID = req.user.id;
            const company = yield Company_1.default.findOne({ creatorID: userID });
            if (!company) {
                res.status(200).json({ success: false, message: "" });
            }
            else {
                res.status(200).json({ success: true, message: "", data: company });
            }
        }
        else {
            res.status(401).json({ success: false, message: "Unauthorized" });
        }
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ success: false, message: "Error getting company", error });
    }
});
exports.getCompany = getCompany;
//# sourceMappingURL=companyController.js.map