import { Request, Response } from "express";
import { RequestExtendsInterface } from "../Types/types";
import Company from "../Models/Company";
import User from "../Models/User";
import fs from "fs";
export const registerCompany = async (
  req: RequestExtendsInterface,
  res: Response
): Promise<void> => {
  try {
    const { companyName, noOfUsers } = req.body;
    if (!req.user) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }
    let companyname = companyName.trim().toLowerCase();
    const userID = req.user.id;
    const existingCompany = await Company.findOne({
      $or: [{ creatorID: userID }, { companyName: companyname }],
    }).populate("creatorID");
    if (existingCompany) {
      res.status(400).json({
        success: false,
        message:
          existingCompany.companyName === companyname
            ? "Company name already exists"
            : "You already have a company",
      });
    } else {
      const previousCompanyID = await Company.findOne().sort({ companyID: -1 });
      const nextCompanyID = previousCompanyID
        ? previousCompanyID.companyID + 1
        : 1;
      const userId = await User.findOne({ _id: userID });
      const UserLimit = process.env.COMPANY_USER_LIMIT || 10;
      if (userId) {
        const company = await Company.create({
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
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error registering company", error });
  }
};
export const uploadCompanyLogo = async (
  req: RequestExtendsInterface,
  res: Response
): Promise<void> => {
  try {
    const file = req.file;
    if (!req.file) {
      res.status(400).json({ success: false, message: "No file uploaded" });
    } else {
      if (!req.user) {
        res.status(401).json({ success: false, message: "Unauthorized" });
      } else {
        const userID = req.user.id;
        const company = await Company.findOne({ creatorID: userID });
        if (!company) {
          res
            .status(404)
            .json({ success: false, message: "First register a company" });
        } else {
          if (company.companyLogo) {
            const previousLogo = company.companyLogo;
            const filePath = `./public/images/${previousLogo}`;
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
          }
          company.companyLogo = file?.filename;
          await company.save();
          res.status(200).json({
            success: true,
            message: "Company logo uploaded successfully",
            company,
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error uploading company logo", error });
  }
};
