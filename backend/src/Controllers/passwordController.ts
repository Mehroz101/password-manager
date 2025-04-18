import { Response } from "express";
import {
  SpecificIDRequest,
  PasswordRequestExtendsInterface,
  RequestExtendsInterface,
} from "../Types/types";
import Password from "../Models/Password";
import User from "../Models/User";
import RecentActivity from "../Models/RecentActivity";
import Passwords from "../Models/Passwords";
import Company from "../Models/Company";

export const AddAndUpdatePassword = async (
  req: PasswordRequestExtendsInterface,
  res: Response
) => {
  try {
    if (req.user) {
      const userID = req.user.id;
      const {
        appName,
        username = "",
        email = "",
        password,
        url: webUrl = "",
        categoryType,
        categoryName,
        passwordID = null,
      } = req.body;
      const ImgURL = `http://localhost:5000/uploads/${categoryName}.png`;
      if (passwordID) {
        const passwordData = await Password.findOne({ passwordID });
        // const EditDate = new Date();
        if (passwordData) {
          // if (categoryName === passwordData.categoryName) {
          //   passwordData.appName = appName;
          //   passwordData.username = username;
          //   passwordData.email = email;
          //   passwordData.password = password;
          //   passwordData.webUrl = webUrl;
          //   passwordData.passwordImg = ImgURL;
          //   passwordData.lastAction.actionType = "Last Edited";
          //   passwordData.lastAction.actionDateTime = EditDate;
          //   passwordData.categoryType = "Social";
          //   await passwordData.save();
          //   res.status(200).json({
          //     success: true,
          //     message: "Password updated successfully",
          //   });
          // } else {
          const EditDate = new Date();
          passwordData.lastAction.actionType = "Last Edited";
          passwordData.lastAction.actionDateTime = EditDate;
          passwordData.categoryType = categoryType;
          passwordData.appName = appName;
          passwordData.username = username;
          passwordData.email = email;
          passwordData.password = password;
          passwordData.webUrl = webUrl;
          passwordData.categoryName = categoryName;
          passwordData.passwordImg = ImgURL;
          const passwordid = await passwordData.save();

          const Userid = await User.findOne({ _id: userID });

          await RecentActivity.findOneAndUpdate(
            {
              userID: Userid?.userID,
              passwordID: passwordid._id,
              actionType: "Last Edited",
            }, // Find existing entry
            { updatedAt: new Date() }, // Update timestamp (or add additional fields)
            { upsert: true, new: true } // Create if not exists, return the updated doc
          );
          res.status(200).json({
            success: true,
            message: "Password updated successfully",
          });
          // }
        } else {
          res
            .status(404)
            .json({ success: true, message: "Password not found" });
        }
      } else {
        const previousPasswordID = await Password.findOne().sort({
          passwordID: -1,
        });
        const nextPasswordID = previousPasswordID
          ? previousPasswordID.passwordID + 1
          : 1;
        const userId = await User.findOne({ _id: userID });
        if (!userId) {
          res
            .status(401)
            .json({ success: true, message: "unauthorized login again" });
        } else {
          const passwordData = new Password({
            appName,
            username,
            email,
            password,
            webUrl,
            categoryName,
            categoryType,
            userID: userId?.userID,
            passwordImg: ImgURL,
            passwordID: nextPasswordID,
            lastAction: {
              actionType: "Created At",
              actionDateTime: new Date(),
            },
          });
          const passwordid = await passwordData.save();
          await RecentActivity.findOneAndUpdate(
            {
              userID: userId?.userID,
              passwordID: passwordid._id,
              actionType: "Created At",
            }, // Find existing entry
            { updatedAt: new Date() }, // Update timestamp (or add additional fields)
            { upsert: true, new: true } // Create if not exists, return the updated doc
          );
          res.status(200).json({
            success: true,
            message: "Password added successfully",
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error adding password", error });
  }
};
export const getAllPasswords = async (
  req: PasswordRequestExtendsInterface,
  res: Response
) => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    let userPasswords = (await Passwords.find({ userID: user._id })) || [];
    console.log("userPasswords: ", userPasswords.length);
    let companyPasswords: any[] = [];

    if (user.companyID) {
      console.log("user.companyID: ", user.companyID);
      companyPasswords =
        (await Passwords.find({ companyPass: user.companyID })) || [];
      console.log("companyPasswords: ", companyPasswords.length);
    }

    const allPasswords = [...userPasswords, ...companyPasswords];
    const uniquePasswordsMap = new Map<string, any>();
    for (const pwd of allPasswords) {
      uniquePasswordsMap.set(pwd._id.toString(), pwd);
    }

    const uniquePasswords = Array.from(uniquePasswordsMap.values());

    res.status(200).json({ success: true, message: "", data: uniquePasswords });
  } catch (error) {
    console.error("Error fetching passwords:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const DeletePassword = async (req: SpecificIDRequest, res: Response) => {
  try {
    // Step 1: Check user auth
    if (!req.user) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const { passwordID } = req.body;

    // Step 2: Validate input
    if (!passwordID) {
      res
        .status(400)
        .json({ success: false, message: "Password ID is required" });
      return;
    }

    // Step 3: Find password by ID
    const passwordDoc = await Passwords.findOne({ passwordID });

    if (!passwordDoc) {
      res.status(404).json({ success: false, message: "Password not found" });
      return;
    }

    // Step 4: Check ownership
    if (passwordDoc.userID?.toString() !== req.user.id) {
      res.status(403).json({
        success: false,
        message: "You are not authorized to delete this password",
      });
      return;
    }

    // Step 5: Delete password
    const deletedPassword = await Passwords.deleteOne({ _id: passwordDoc._id });

    if (deletedPassword.deletedCount === 0) {
      res
        .status(500)
        .json({ success: false, message: "Failed to delete password" });
      return;
    }

    // Step 6: Clean up related activity
    await RecentActivity.deleteMany({ passwordID: passwordDoc._id });

    res.status(200).json({
      success: true,
      message: "Password deleted successfully",
    });
    return;
  } catch (error: any) {
    console.error("Error deleting password:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

export const GetSpecificPassword = async (
  req: SpecificIDRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const { passwordID } = req.body;
    if (!passwordID) {
      res
        .status(400)
        .json({ success: false, message: "Password ID is required" });
      return;
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    // Try to find the password for the specific user
    let passwordData = await Passwords.findOne({
      passwordID,
      userID: user._id,
    });

    // If not found, check if it exists under the company
    if (!passwordData && user.companyID) {
      passwordData = await Passwords.findOne({
        passwordID,
        companyPass: user.companyID,
      });
    }

    if (!passwordData) {
      res.status(404).json({ success: false, message: "Password not found" });
      return;
    }

    // Track recent activity
    await RecentActivity.findOneAndUpdate(
      {
        userID: user.userID,
        passwordID: passwordData._id,
        actionType: "Last Viewed",
      },
      { updatedAt: new Date() },
      { upsert: true, new: true }
    );

    res.status(200).json({
      success: true,
      message: "Password retrieved successfully",
      data: passwordData,
    });
    return;
  } catch (error) {
    console.error("Error in GetSpecificPassword:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
    return;
  }
};

export const RecentActivities = async (
  req: RequestExtendsInterface,
  res: Response
) => {
  try {
    if (req.user) {
      const userID = await User.findOne({ _id: req.user.id });
      const recentActivities = await RecentActivity.find({
        userID: userID?.userID,
      }).populate("passwordID");
      res
        .status(200)
        .json({ success: true, message: "", data: recentActivities });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const DynamicPasswordStore = async (
  req: RequestExtendsInterface,
  res: Response
) => {
  try {
    if (req.user) {
      const { type, fields, passwordID = null, showCompany = false } = req.body;
      const user = await User.findById(req.user.id);

      if (passwordID) {
        const password = await Passwords.findOne({ passwordID: passwordID });
        if (password) {
          let compnayID = null;
          if (showCompany) {
            const company = await Company.findOne({ creatorID: user?._id });
            compnayID = company?._id;
          }

          await Passwords.updateOne(
            { passwordID: passwordID },
            {
              $set: { type: type, fields: fields },
              companyPass: compnayID,
              lastAction: {
                actionType: "Last Edited",
                actionDateTime: new Date(),
              },
            }
          );

          await RecentActivity.findOneAndUpdate(
            {
              userID: user?.userID,
              passwordID: password._id,
              actionType: "Last Edited",
            },
            { updatedAt: new Date() },
            { upsert: true, new: true }
          );
        }
        res.status(200).json({
          success: true,
          message: "Password updated successfully",
        });
        return;
      }
      const previousPasswordID = await Passwords.findOne().sort({
        passwordID: -1,
      });
      const nextPasswordID = previousPasswordID
        ? previousPasswordID.passwordID + 1
        : 1;
      let compnayID = null;
      if (showCompany) {
        const company = await Company.findOne({ creatorID: user?._id });
        compnayID = company?._id;
      }
      const passwordData = await Passwords.create({
        passwordID: nextPasswordID,
        userID: req.user.id,
        type: type,
        fields: fields,
        companyPass: compnayID,
        lastAction: {
          actionType: "Created At",
          actionDateTime: new Date(),
        },
      });

      await RecentActivity.findOneAndUpdate(
        {
          userID: user?.userID,
          passwordID: passwordData._id,
          actionType: "Created At",
        },
        { updatedAt: new Date() },
        { upsert: true, new: true }
      );
      res.status(201).json({
        success: true,
        message: "Password stored successfully",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
