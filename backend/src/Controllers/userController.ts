import { Response } from "express";
import { RequestExtendsInterface, UserDetailInterface } from "../Types/types";
import User from "../Models/User";
import Password from "../Models/Password";
import bcrypt from "bcryptjs";
import fs from "fs";
import Passwords from "../Models/Passwords";
import Company from "../Models/Company";

export const GetUserProfileData = async (
  req: RequestExtendsInterface,
  res: Response
) => {
  try {
    if (req.user) {
      const user = await User.findOne({ _id: req.user.id });
      if (user) {
        const passwords = await Password.find({ userID: user.userID });
        const sendData = {
          user: user,
          passwords: passwords?.length,
        };
        res.status(200).json({
          success: true,
          data: sendData,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Internal server error",
    });
  }
};
export const GetUserProfileDetail = async (
  req: RequestExtendsInterface,
  res: Response
): Promise<void> => {
  try {
    console.log('=====================================================')
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
console.log("1 User Found");
console.log("userID: ",user.userID);
    const userPasswords = await Passwords.find({ userID: user._id }) || [];
    console.log("2 userPasswords: ",userPasswords.length);

    let companyPasswords: any[] = [];
    let companyName = "";
    let totalEmployees = 0;
    let isCompanyOwner = false;

    if (user.companyID) {
      console.log("3 companyID Found ");

      companyPasswords = await Passwords.find({ companyPass: user.companyID }) || [];
      console.log("3 companyPasswords: ",companyPasswords.length);
      const company = await Company.findById(user.companyID);
      if (company) {
        console.log("4 company Found ");

        const isMember = company.companyUserIDs.some(
          (empId) => empId.toString() === userId.toString()
        );

        if (isMember) {
          console.log("5 Company Member Found ");

          companyName = company.companyName;
          totalEmployees = company.companyUserIDs.length;

          if (company.creatorID.toString() === userId.toString()) {
            console.log("5 Company Owner Found ");

            isCompanyOwner = true;
          }
        }
      }
    }
    const totalPasswords = [...userPasswords, ...companyPasswords];
    const uniquePasswordsMap = new Map<string, any>();
    for (const pwd of totalPasswords) {
      uniquePasswordsMap.set(pwd._id.toString(), pwd);
    }

    const uniquePasswords = Array.from(uniquePasswordsMap.values());
    console.log("5 uniquePasswords: ",uniquePasswords.length);
    res.status(200).json({
      success: true,
      data: {
        user,
        passwordsCount: uniquePasswords.length,
        companyOwner: isCompanyOwner,
        companyPasswords: companyPasswords.length,
        totalEmployees,
        companyName,
      },
    });
  } catch (error) {
    console.error("Error occurred in UpdateUserDetail:", error); // Log the error for debugging
    res.status(500).json({ success: false, message: "An unexpected error occurred. Please try again later." });
  }
};

export const UpdateUserDetail = async (
  req: UserDetailInterface, // Ensure req.user is typed correctly
  res: Response
): Promise<void> => {
  try {
    // Check if the user is authenticated
    if (req.user) {
      const { username, fullname, password, nPassword } = req.body;

      // Find the user by ID
      const user = await User.findById(req.user.id);
      if (user) {
        // Check if both password fields are provided
        if (password && nPassword) {
          // Check if the new username already exists
          const isUsernameExist = (await User.findOne({
            username,
          })) as UserDetailInterface;
          if (
            !isUsernameExist ||
            (isUsernameExist?._id?.toString() ?? "") === req.user.id
          ) {
            // Verify the old password
            const isVerified = await bcrypt.compare(password, user.password);
            if (isVerified) {
              // Hash the new password
              const encryptedPassword = await bcrypt.hash(nPassword, 10);

              // Update user details
              await User.findByIdAndUpdate(req.user.id, {
                username,
                fullname,
                password: encryptedPassword,
              });

              // Respond with success
              res.status(200).json({
                success: true,
                message: "Details updated successfully",
              });
            } else {
              // Incorrect password
              res
                .status(401)
                .json({ success: false, message: "Incorrect password" });
            }
          } else {
            // Username already exists
            res
              .status(400)
              .json({ success: false, message: "Username already exists" });
          }
        } else {
          // Password fields are required
          res
            .status(400)
            .json({ success: false, message: "Password fields are required" });
        }
      } else {
        // User not found
        res.status(404).json({ success: false, message: "User  not found" });
      }
    } else {
      // Unauthorized access
      res.status(401).json({ success: false, message: "Unauthorized" });
    }
  } catch (error) {
    console.error("Error updating user details:", error); // Log the error for debugging
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const UpdateProfileImg = async (
  req: RequestExtendsInterface,
  res: Response
) => {
  try {
    if (!req?.file) {
      res.status(400).json({ success: false, message: "No file uploaded" });
    } else {
      const file = req?.file;
      if (!req.user) {
        res.status(401).json({ success: false, message: "Unauthorized" });
      } else {
        const userID = req.user.id;
        const user = await User.findOne({ _id: userID });
        if (!user) {
          res
            .status(404)
            .json({ success: false, message: "First Create an Account" });
        } else {
          if (user.profileImg) {
            const previousImg = user.profileImg;
            const filePath = `./uploads/${previousImg}`;
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
          }
          user.profileImg = file?.filename;
          await user.save();
          res.status(200).json({
            success: true,
            message: "Profile image uploaded successfully",
            user,
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      message: "Internal server error",
    });
  }
};
