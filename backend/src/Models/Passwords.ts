import mongoose, { Schema } from "mongoose";

const passwordSchema = new Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    passwordID: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    fields: {
      type: Map,
      of: String,
    },
    companyPass: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
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

export default mongoose.model("Passwords", passwordSchema);
