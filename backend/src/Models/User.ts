import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  fullname?:string,
  username: string;
  userID: number;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema(
  {
    fullname:{type:String},
    username: { type: String, required: true },
    userID: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", UserSchema);
