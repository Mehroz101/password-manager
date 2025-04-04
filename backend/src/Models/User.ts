import mongoose, { Schema, Document,Types } from "mongoose";

export interface IUser extends Document {
  fullname?: string;
  username: string;
  userID: number;
  email: string;
  password: string;
  profileImg?: string;
  companyID?: Types.ObjectId | null;
}

const UserSchema: Schema = new Schema(
  {
    fullname: { type: String },
    username: { type: String, required: true },
    userID: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImg: { type: String },
    companyID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", UserSchema);
