import mongoose, { Document, Schema, Types } from "mongoose";

export interface ICompany extends Document {
  companyName: string;
  companyID: number;
  companyUserIDs: Types.ObjectId[];
  companyUserLimit: number;
  creatorID: Types.ObjectId;
  noOfUsers: number;
  companyLogo?: string;
}

const CompanySchema = new Schema(
  {
    companyName: {
      type: String,
      required: true,
      unique: true,
    },
    companyID: {
      type: Number,
      required: true,
      unique: true,
    },
    noOfUsers: {
      type: Number,
      required: true,
    },
    companyUserIDs: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    companyUserLimit: {
      type: Number,
    },
    creatorID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    companyLogo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICompany>("Company", CompanySchema);
