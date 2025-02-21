import { Response } from "express";
import { PasswordRequestExtendsInterface } from "../Types/types";
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
        const passwordData = new Password({
          appName,
          username,
          email,
          password,
          webUrl,
          categoryName,
          userID: UserID?.userID,
          passwordImg: ImgURL,
        });
        await passwordData.save();
        res.status(200).json({
          success: true,
          message: "Password added successfully",
        });
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
    if (req.user) {
      const userID = req.user.id;
      const passwords = await Password.find({ userID });
      res.status(200).json({ success: true, message: "", data: passwords });
    } else {
      res.status(401).json({ success: false, message: "Unauthorized" });
    }
  } catch (error) {}
};
