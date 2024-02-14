import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TodoSchema = new Schema({
  todos: {
    type: [String], // Array of strings
    required: true,
    default: [],
  },
});
const Todo = mongoose.model("todo", TodoSchema);

export default Todo;
