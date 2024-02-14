import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  todo: { type: Schema.Types.ObjectId, ref: "Todo" },
});

const User = mongoose.model("user", UserSchema);
export default User;
