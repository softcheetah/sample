import mongoose from "mongoose";
import { TOKEN_TYPE } from "../constants";

const tokenSchema = new mongoose.Schema({
  user : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type : {
    type     : String,
    enum     : Object.values(TOKEN_TYPE),
    required : true,
    default  : TOKEN_TYPE.EMAIL
  },
  token     : { type: String, required: true, unique: true },
  createdAt : { type: Date, default: Date.now, expires: 3600 }
});

export default mongoose.model("Token", tokenSchema);
