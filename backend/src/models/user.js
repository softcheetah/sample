import mongoose from "mongoose";
import {
  USER_PERMISSION, USER_STATUS
} from "../constants";

const userSchema = new mongoose.Schema({
  firstName   : { type: String },
  lastName    : { type: String },
  email       : { type: String, unique: true },
  salt        : { type: String },
  password    : { type: String },
  permissions : {
    type     : [{ type: String, enum: Object.values(USER_PERMISSION) }],
    required : true,
    default  : []
  },
  status: {
    type     : String,
    enum     : Object.values(USER_STATUS),
    required : true,
    default  : USER_STATUS.ACTIVE
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);
