const mongoose = require("mongoose");
const Todo = require("../../models/todo/todo.model");

const uri = `http://localhost:8080/todos/`;

const addTodo = todo => {
  const todoToAdd = new Todo({
    ...todo,
    _id: new mongoose.Types.ObjectId(),
    date: Date.now()
  });

  return todoToAdd
    .save()
    .then(result =>
      Object.assign({}, { data: result, link: `${uri}${result._id}` })
    );
};

const findAllTodos = _ => {
  return Todo.find().then(res =>
    (res || []).map(todo =>
      Object.assign({}, { data: todo, link: `${uri}${todo.id}` })
    )
  );
};

const findById = id => {
  return new Promise(async (resolve, reject) => {
    let todo;
    try {
      todo = await Todo.findById(id);
    } catch (e) {
      reject(e);
    }

    if (!todo) {
      reject({
        message: `No todo exists with id ${id}`
      });
    }

    resolve({
      data: todo,
      link: `${uri}${id}`
    });
  });
};

const deleteTodo = _id => Todo.findOneAndDelete({ _id });

const updateTodo = (_id, todo) => {
  return Todo.findOneAndUpdate(_id, todo, { new: true }).then(result =>
    Object.assign({ data: result, link: `${uri}${_id}` })
  );
};

module.exports = {
  addTodo,
  updateTodo,
  findById,
  findAllTodos,
  deleteTodo
};
