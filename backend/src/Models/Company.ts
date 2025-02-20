import mongoose, { Document, Schema, Types } from "mongoose";

export interface ICompany extends Document {
  companyName: string;
  companyID: number;
  companyUserIDs: number[];
  companyUserLimit: number;
  creatorID: Types.ObjectId;
  noOfUsers: number;
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
      type: [Number],
    },
    companyUserLimit: {
      type: Number,
    },
    creatorID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICompany>("Company", CompanySchema);
