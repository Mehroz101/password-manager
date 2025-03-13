"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbconnection_1 = require("./DB/dbconnection");
const authRoutes_1 = __importDefault(require("./Routes/authRoutes"));
const companyRoutes_1 = __importDefault(require("./Routes/companyRoutes"));
const passwordRoutes_1 = __importDefault(require("./Routes/passwordRoutes"));
const userRoutes_1 = __importDefault(require("./Routes/userRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use("/uploads", express_1.default.static("uploads"));
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Connect to MongoDB
(0, dbconnection_1.connectDB)();
// Routes
app.use("/api/auth", authRoutes_1.default);
app.use("/api/company", companyRoutes_1.default);
app.use("/api/password", passwordRoutes_1.default);
app.use("/api/user", userRoutes_1.default);
app.get("/", (req, res) => {
    res.send("helo versel");
});
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//# sourceMappingURL=server.js.map