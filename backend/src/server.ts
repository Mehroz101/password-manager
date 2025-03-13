import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./DB/dbconnection";
import authRoutes from "./Routes/authRoutes";
import companyRoutes from "./Routes/companyRoutes";
import passwordRoutes from "./Routes/passwordRoutes";
import userRoutes from "./Routes/userRoutes";

dotenv.config();
const app = express();
app.use("/uploads", express.static("uploads"));

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/password", passwordRoutes);
app.use("/api/user", userRoutes);
app.get("/",(req:Request,res:Response)=>{
    res.send("helo versel")
})
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
export default app;
