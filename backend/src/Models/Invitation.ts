import mongoose, { Schema } from "mongoose";

const InvitationSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  accessLevel: {
    type: String,
    required: true,
  },
  senderID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  companyID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  token: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});
export default mongoose.model("Invitation", InvitationSchema);
