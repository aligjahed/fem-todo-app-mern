import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import todosSlice from "../features/todos/todosSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    todos: todosSlice,
  },
});
