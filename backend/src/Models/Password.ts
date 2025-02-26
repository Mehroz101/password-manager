import mongoose, { Document, Schema } from "mongoose";

export interface IPassword extends Document {
  password: string;
  userID: number;
  email: string;
  appName: string;
  categoryName: string;
  username: string;
  webUrl: string;
  passwordID: number;
  passwordImg: string;
  categoryType: String;
  lastAction: {
    actionType: String;
    actionDateTime: Date;
  };
}
const PasswordSchema = new Schema(
  {
    password: { type: String, required: true },
    userID: { type: Number, required: true },
    email: { type: String },
    categoryName: { type: String, required: true },
    appName: { type: String, required: true },
    username: { type: String },
    webUrl: { type: String },
    passwordID: { type: Number, required: true },
    passwordImg: { type: String, required: true },
    categoryType: {
      type: String,
      required: true,
    },
    lastAction: {
      actionType: {
        type: String,
      },
      actionDateTime: {
        type: Date,
      },
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model<IPassword>("Password", PasswordSchema);
