import { Request, Response } from "express";
import { RequestExtendsInterface } from "../Types/types";
import Company from "../Models/Company";
import User from "../Models/User";

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
