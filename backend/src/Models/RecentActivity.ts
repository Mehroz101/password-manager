import mongoose, { Schema, Types } from "mongoose";

interface RencentActivityInterface {
  passwordID: Types.ObjectId;
  actionType: string;
  userID: number;
}
const RecentActivitySchema: Schema = new Schema(
  {
    passwordID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Password",
    },
    userID: {
      type: Number,
      required: true,
    },
    actionType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model<RencentActivityInterface>(
  "RecentActivity",
  RecentActivitySchema
);
