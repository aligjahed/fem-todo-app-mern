import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import todoService from "./todosService";

const initialState = {
  onlyCompleted: [],
  onlyActive: [],
  allTodos: [],
  todos: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  isUpdated: false,
  message: "",
};

export const createTodo = createAsyncThunk(
  "todos/createTodo",
  async (todo, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await todoService.createTodo(todo, token);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getTodos = createAsyncThunk(
  "todos/getTodos",
  async (__, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await todoService.getTodos(token);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await todoService.deleteTodo(id, token);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await todoService.updateTodo(id, token);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.isUpdated = false;
      state.message = "";
    },
    onlyComplete: (state) => {
      state.todos = state.onlyCompleted;
    },
    onlyActive: (state) => {
      state.todos = state.onlyActive;
    },
    showAll: (state) => {
      state.todos = state.allTodos;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodo.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.todos.push(action.payload);
        state.allTodos.push(action.payload);
        state.onlyActive.push(action.payload);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getTodos.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isUpdated = false;
        state.todos = action.payload;
        state.allTodos = action.payload;
        state.onlyActive = state.allTodos.filter(
          (todo) => todo.completed === false
        );
        state.onlyCompleted = state.allTodos.filter(
          (todo) => todo.completed === true
        );
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;

        state.message = action.payload;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.todos = state.todos.filter(
          (todo) => todo._id !== action.payload._id
        );
        state.allTodos = state.allTodos.filter(
          (todo) => todo._id !== action.payload._id
        );
        state.onlyActive = state.onlyActive.filter(
          (todo) => todo._id !== action.payload._id
        );
        state.onlyCompleted = state.onlyCompleted.filter(
          (todo) => todo._id !== action.payload._id
        );
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(updateTodo.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isUpdated = false;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isUpdated = true;
        state.todos.push(action.payload);
        state.allTodos.push(action.payload);
        state.onlyActive.push(action.payload);
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.isUpdated = false;
        state.message = action.payload;
      });
  },
});

export const { reset, onlyActive, onlyComplete, showAll } = todoSlice.actions;
export default todoSlice.reducer;
