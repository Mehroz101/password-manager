import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./DB/dbconnection";
import authRoutes from "./Routes/authRoutes";
import companyRoutes from "./Routes/companyRoutes";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/company", companyRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
