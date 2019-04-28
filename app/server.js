const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectToDb = require("./db.server");
const app = express();

connectToDb(process.env.MONGO_DB_URI);

const todoRoutes = require("./src/controllers/todo.controller");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors());

app.use("/todos", todoRoutes);

app.listen(8080, () => console.log("listening on port 8080"));
