const asyncHandler = require("express-async-handler");
const Todo = require("../models/todosModel");

// @desc Get Todo
// @route GET /api/todos/
// @access Private
const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find({ user: req.user.id });

  if (todos) {
    res.status(200).json(todos);
  } else {
    res.status(400);
    throw new Error("No todo found");
  }
});

// @desc Create Todo
// @route POST /api/todos/create
// @access Private
const createTodo = asyncHandler(async (req, res) => {
  if (!req.body.todo) {
    res.status(400);
    throw new Error("Please add a value");
  }

  const todo = await Todo.create({
    user: req.user.id,
    todo: req.body.todo,
  });

  if (todo) {
    res.status(200).json(todo);
  } else {
    res.status(400);
    throw new Error("Something went wrong");
  }
});

// @desc Delete Todo
// @route DELETE /api/todos/delete/:id
// @access Private
const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(400);
    throw new Error("Todo not found");
  }

  if (todo.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await todo.remove();

  res.status(200).json({ _id: req.params.id });
});

// @desc Update Todo
// @route PUT /api/todos/update/:id
// @access Private
const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(400);
    throw new Error("Todo not found");
  }

  if (todo.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedTodo = {
    completed: !todo.completed,
  };

  const updateTodo = await Todo.findByIdAndUpdate(req.params.id, updatedTodo);

  res.status(200).json(updateTodo);
});

module.exports = { createTodo, deleteTodo, getTodos, updateTodo };
