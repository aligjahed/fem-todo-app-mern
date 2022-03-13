const express = require("express");
const router = express.Router();
const {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} = require("../controllers/todosController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getTodos);
router.post("/create", protect, createTodo);
router.put("/update/:id", protect, updateTodo);
router.delete("/delete/:id", protect, deleteTodo);

module.exports = router;
