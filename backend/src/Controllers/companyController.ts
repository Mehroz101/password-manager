import { Request, Response } from "express";
import { RequestExtendsInterface } from "../Types/types";
import Company from "../Models/Company";
import User, { IUser } from "../Models/User";
import fs from "fs";
import crypto from "crypto";
import Invitation from "../Models/Invitation";
import { sendEmail } from "../utils/sendEmail";
import bcrypt from "bcryptjs";
import { Types } from "mongoose";

import { IncomingMessage } from "http";
import { ObjectId } from "mongoose";
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
    if (!req?.file) {
      res.status(400).json({ success: false, message: "No file uploaded" });
    } else {
      const file = req?.file;
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
            const filePath = `./uploads/${previousLogo}`;
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

export const getCompany = async (
  req: RequestExtendsInterface,
  res: Response
) => {
  try {
    if (req.user) {
      const userID = req.user.id;
      const company = await Company.findOne({ creatorID: userID });
      if (!company) {
        res.status(200).json({ success: false, message: "" });
      } else {
        res.status(200).json({ success: true, message: "", data: company });
      }
    } else {
      res.status(401).json({ success: false, message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error getting company", error });
  }
};
export const SendInvitation = async (
  req: RequestExtendsInterface,
  res: Response
): Promise<void> => {
  try {
    console.log(req.body);

    if (!req.user) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const userID = req.user.id;
    const findCompany = await Company.findOne({ creatorID: userID });

    if (!findCompany) {
      res.status(400).json({ success: false, message: "Company not found" });
      return;
    }

    const checkUser = await User.findOne({ email: req.body.email });

    if (!checkUser) {
      res.status(400).json({
        success: false,
        message: "User needs to register before being invited",
      });
      return;
    }

    // Check if user is already part of the company
    const isUserInCompany = findCompany?.companyUserIDs?.some(
      (user) => user.toString() === checkUser._id.toString()
    );

    if (isUserInCompany) {
      res.status(400).json({
        success: false,
        message: "User is already a member of this company",
      });
      return;
    }

    // Generate invitation token
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // Expires in 24 hours

    await Invitation.create({
      email: req.body.email,
      accessLevel: req.body.accessLevel,
      companyID: findCompany._id,
      token,
      status: "pending",
      expiresAt,
      senderID: userID,
    });

    const invitationUrl = `${process.env.CLIENT_URL}/join/${findCompany.companyName}/${token}`;
    const message = `You have been invited to join ${findCompany.companyName}. Click the link below to accept the invitation:\n\n${invitationUrl}\n\nThis link will expire in 24 hours.`;

    await sendEmail({
      to: req.body.email,
      subject: `Invitation to join ${findCompany.companyName}`,
      text: message,
    });

    res
      .status(200)
      .json({ success: true, message: "Invitation sent successfully" });
    return;
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Error sending invitation",
      error: error.message,
    });
    return;
  }
};

export const AcceptInvitation = async (
  req: RequestExtendsInterface,
  res: Response
): Promise<void> => {
  try {
    console.log(req.body);

    if (!req.user) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const { token } = req.body;
    const userID = req.user.id;

    // Find the invitation and ensure it's still valid
    const findInvitation = await Invitation.findOne({
      token: token,
      expiresAt: { $gt: new Date() },
    });

    if (!findInvitation) {
      res.status(400).json({
        success: false,
        message: "Invitation Expired or Invalid Request",
      });
      return;
    }

    // Find user accepting the invitation
    const user: IUser | null = await User.findById(userID);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    console.log(user);
    // Ensure the user is the invited person
    if (user.email !== findInvitation.email) {
      res.status(403).json({
        success: false,
        message: "You are not authorized to accept this invitation",
      });
      return;
    }

    // Add the user to the company
    const findCompany = await Company.findById(findInvitation.companyID);
    if (!findCompany) {
      res.status(404).json({
        success: false,
        message: "Company not found",
      });
      return;
    }

    // Ensure companyUserIDs is initialized
    if (!findCompany.companyUserIDs) {
      findCompany.companyUserIDs = [];
    }

    // Prevent duplicate entries
    const userId = new Types.ObjectId(user._id.toString());

    if (!findCompany.companyUserIDs.includes(userId)) {
      findCompany.companyUserIDs.push(userId);
      await findCompany.save();
      // Update invitation status
      findInvitation.status = "accepted";
      await findInvitation.save();

      res
        .status(200)
        .json({ success: true, message: "Invitation accepted successfully" }); // Update invitation status
      findInvitation.status = "accepted";
      await findInvitation.save();

      res
        .status(200)
        .json({ success: true, message: "Invitation accepted successfully" });
    } else {
      res
        .status(200)
        .json({ success: false, message: "Already member of this company" });
      return;
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Error accepting invitation",
      error: error.message,
    });
  }
};
