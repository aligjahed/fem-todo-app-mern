const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorhandler");

const port = process.env.PORT;

connectDB();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));

app.use("/api/todos", require("./routes/todosRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, console.log(`Server is running on port ${port}`));
