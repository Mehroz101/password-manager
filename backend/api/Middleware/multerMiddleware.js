"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Set up storage for uploaded images
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Uploads will be stored in the "uploads" folder
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
// File filter (accept only images)
const fileFilter = (req, file, cb) => {
    const allowedExtensions = /jpeg|jpg|png/;
    const extname = allowedExtensions.test(path_1.default.extname(file.originalname).toLowerCase());
    const mimetype = allowedExtensions.test(file.mimetype);
    if (extname && mimetype) {
        cb(null, true);
    }
    else {
        cb(new Error("Only JPEG, JPG, and PNG images are allowed!"));
    }
};
// Multer Upload Middleware
const upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Limit file size to 2MB
    fileFilter: fileFilter,
});
exports.default = upload;
//# sourceMappingURL=multerMiddleware.js.map