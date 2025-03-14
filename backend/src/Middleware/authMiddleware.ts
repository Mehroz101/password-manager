import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { RequestExtendsInterface } from "../Types/types";

export const protect = (
  req: RequestExtendsInterface,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Please login to your account" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };
    req.user = { id: decoded.id }; // ✅ Ensure `req.user` is always set
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Please login again" });
    return;
  }
};
