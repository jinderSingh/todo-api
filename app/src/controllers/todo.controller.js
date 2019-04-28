const express = require("express");
const router = express.Router();

const todoService = require("./../services/todo/todo.service");

router.get("/", (req, res) => {
  todoService
    .findAllTodos()
    .then(todos => res.status(200).json(todos))
    .catch(error => res.status(500).json(error));
});

router.post("/", (req, res) => {
  todoService
    .addTodo(req.body)
    .then(todo => res.status(201).json(todo))
    .catch(error => res.status(500).json(error));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  todoService
    .findById(id)
    .then(result => res.status(200).json(result))
    .catch(error => res.status(500).json(error));
});

router.put("/:id", (req, res) => {
  console.log("puttin");
  const { id } = req.params;
  const { body } = req;
  todoService
    .updateTodo(id, body)
    .then(result => res.status(201).json(result))
    .catch(error => res.status(500).json(error));
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  todoService
    .deleteTodo(id)
    .then(result => {
      console.info(`Todo with ${id} removed successfully`);
      res.status(204).json(result);
    })
    .catch(error => res.status(500).json(error));
});

module.exports = router;
