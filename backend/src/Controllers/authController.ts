import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/User";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log(req.body);
    const { username, email, password } = req.body;
    const isUserExist = await User.findOne({ username: username });
    if (isUserExist) {
      res.status(400).json({ success: false, message: "User already exists" });
    } else {
      const previousUserID = await User.findOne().sort({ userID: -1 });
      const nextUserID = previousUserID ? previousUserID.userID + 1 : 1;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        username,
        email,
        password: hashedPassword,
        userID: nextUserID,
      });
      await user.save();
      res
        .status(201)
        .json({ success: true, message: "User registered successfully" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Registration failed", error });
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
      expiresIn: "10day",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Login failed", error });
  }
};
