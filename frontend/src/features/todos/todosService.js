import axios from "axios";

const API_URL = "/api/todos/";

const createTodo = async (todo, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "create", todo, config);

  return response.data;
};

const getTodos = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

const deleteTodo = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + `delete/${id}`, config);

  return response.data;
};

const updateTodo = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios({
    method: "put",
    url: API_URL + "update/" + id,
    headers: { Authorization: "Bearer " + token },
  }); //headers are sent

  return response.data;
};

const todoService = {
  createTodo,
  getTodos,
  deleteTodo,
  updateTodo,
};

export default todoService;
