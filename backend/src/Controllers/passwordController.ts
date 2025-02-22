import { Response } from "express";
import { DeleteRequest, PasswordRequestExtendsInterface } from "../Types/types";
import Password from "../Models/Password";
import User from "../Models/User";

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
        categoryName,
        passwordID = null,
      } = req.body;
      const UserID = await User.findOne({ _id: userID });
      const ImgURL = `http://localhost:5000/uploads/${categoryName}.png`;
      if (passwordID) {
        const passwordData = await Password.findOne({ passwordID });

        if (passwordData) {
          if (categoryName === passwordData.categoryName) {
            passwordData.appName = appName;
            passwordData.username = username;
            passwordData.email = email;
            passwordData.password = password;
            passwordData.webUrl = webUrl;
            passwordData.passwordImg = ImgURL;
            await passwordData.save();
            res.status(200).json({
              success: true,
              message: "Password updated successfully",
            });
          } else {
            passwordData.appName = appName;
            passwordData.username = username;
            passwordData.email = email;
            passwordData.password = password;
            passwordData.webUrl = webUrl;
            passwordData.categoryName = categoryName;
            passwordData.passwordImg = ImgURL;
            await passwordData.save();
            res.status(200).json({
              success: true,
              message: "Password updated successfully",
            });
          }
        }
      } else {
        const previousPasswordID = await Password.findOne().sort({
          passwordID: -1,
        });
        console.log(previousPasswordID);
        const nextPasswordID = previousPasswordID
          ? previousPasswordID.passwordID + 1
          : 1;
        const userId = await User.findOne({ _id: userID });
        console.log("userId", userId);
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
            userID: userId?.userID,
            passwordImg: ImgURL,
            passwordID: nextPasswordID,
          });
          await passwordData.save();
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
        const passwords = await Password.find({ userID: user.userID });

        res.status(200).json({ success: true, message: "", data: passwords });
      }
    }
  } catch (error) {
    console.error("Error fetching passwords:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const DeletePassword = async (req: DeleteRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: "Unauthorized" });
    } else {
      const { passwordID } = req.body;
      console.log(req.body);
      if (!passwordID) {
        res
          .status(400)
          .json({ success: false, message: "Password ID is required" });
      } else {
        console.log("Request Body:", req.body);

        const deletedPassword = await Password.findOneAndDelete({
          passwordID: passwordID,
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
