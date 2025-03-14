import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/User";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, email, password: plainPassword } = req.body;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
       res.status(400).json({
        success: false,
        message: `Username ${username} or email ${email} already exists`,
      });
    }
    else{
      const hashedPassword = await bcrypt.hash(plainPassword, 10);
      const nextUserID = await User.findOne().sort({ userID: -1 })
      const userID = nextUserID ? nextUserID.userID + 1 : 1;
      const user = new User({
        username,
        email,
        password: hashedPassword,
        userID: userID,
      });
      await user.save();
  
      res.status(201).json({
        success: true,
        message: "User registered successfully",
      });

    }

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error,
    });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "10days",
    });

    res.json({success:true,message:"Login successful",token: token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Login failed", error });
  }
};
