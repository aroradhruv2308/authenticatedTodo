import mongoose from "mongoose";
import User from "./models/user.js";
import Todo from "./models/todo.js";

export const addToDo = async function (username, todoString) {
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      throw new Error("User not found");
    }
    if (!user.todo || user.todo.isEmpty()) {
      // initialise new todo here
      user.todo = new Todo({ todos: [todoString] });
    } else {
      user.todo.todos.push(todoString);
    }
    await user.save();
  } catch (error) {
    throw new Error(`Error adding todo: ${error.message}`);
  }
};

export const updateTodo = function (id, todoString) {
  // update the todo in the data base
};

export const deleteTodo = function (id) {
  // delete the todo from the data base
};

export const getAllTodo = function () {
  // get all the todos from the database
};

export const addUser = async function (username, password) {
  let user = await User.findOne({ username: username });
  if (user) {
    throw new Error("user already exists");
  }
  user = new User({ username, password });
  await user.save();
  console.log(username + "registered successfully");
};

export const findUser = async function (username, password) {
  let user = await User.findOne({ username: username });
  return user;
};
