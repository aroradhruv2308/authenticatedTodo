import mongoose from "mongoose";
import "dotenv/config";
import Todo from "./models/todo.js";
import User from "./models/user.js";

async function connectToDB() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("database connected successfully");
  } catch (error) {
    console.log("Got some error while connecting to the db");
  }
}
export default connectToDB;
