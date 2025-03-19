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
    } else {
      const user = await User.findOne({ _id: req.user.id });
      if (!user) {
        res.status(404).json({ success: false, message: "User not found" });
      } else {
        const passwords = await Passwords.find({ userID: user });

        res.status(200).json({ success: true, message: "", data: passwords });
      }
    }
  } catch (error) {
    console.error("Error fetching passwords:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const DeletePassword = async (req: SpecificIDRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: "Unauthorized" });
    } else {
      const { passwordID } = req.body;
      if (!passwordID) {
        res
          .status(400)
          .json({ success: false, message: "Password ID is required" });
      } else {
        const userID = await User.findOne({ _id: req.user.id });
        if (!userID) {
          return;
        }
        const passwordDoc = await Password.findOne({
          passwordID: passwordID, // Search by custom passwordID field
          userID: userID?.userID, // Ensure it's linked to the correct user
        });
        const deletedPassword = await Password.deleteOne({
          _id: passwordDoc?._id,
        });
        await RecentActivity.deleteMany({
          passwordID: passwordDoc?._id, // Use the actual _id of the password
        });
        if (!deletedPassword) {
          res
            .status(404)
            .json({ success: false, message: "Password not found" });
        } else {
          res
            .status(200)
            .json({ success: true, message: "Password deleted successfully" });
        }
      }
    }
  } catch (error) {
    console.error("Error deleting password:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const GetSpecificPassword = async (
  req: SpecificIDRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: "Unauthorized" });
    } else {
      const { passwordID } = req.body;
      if (!passwordID) {
        res
          .status(400)
          .json({ success: false, message: "Password ID is required" });
      } else {
        const userID = await User.findOne({ _id: req.user.id });
        if (!userID) {
          return;
        }
        const passwordData = await Passwords.findOne({
          passwordID: passwordID,
          userID: userID,
        });
        if (!passwordData) {
          res
            .status(404)
            .json({ success: false, message: "Password not found" });
        } else {
          await RecentActivity.findOneAndUpdate(
            {
              userID: userID?.userID,
              passwordID: passwordData._id,
              actionType: "Last Viewed",
            }, // Find existing entry
            { updatedAt: new Date() }, // Update timestamp (or add additional fields)
            { upsert: true, new: true } // Create if not exists, return the updated doc
          );
          res
            .status(200)
            .json({ success: true, message: "", data: passwordData });
        }
      }
    }
  } catch (error) {
    console.log(error);
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
      // const userID = await User.findOne({ _id: req.user.id });
      const { type, fields } = req.body;
      console.log(req.body);
      const previousPasswordID = await Passwords.findOne().sort({
        passwordID: -1,
      });
      const nextPasswordID = previousPasswordID
        ? previousPasswordID.passwordID + 1
        : 1;
      const passwordData = await Passwords.create({
        passwordID: nextPasswordID,
        userID: req.user.id,
        type: type,
        fields: fields,
      });
      console.log(passwordData);
      res.status(201).json({
        success: true,
        message: "Password stored successfully",
      });
    }
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
