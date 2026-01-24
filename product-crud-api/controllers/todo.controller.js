const { zodParse, sendSuccess } = require('../lib/utils');
const Task = require('../db/models/todo.model');
const axios = require('axios');

const createTodo = async (req, res) => {
  const allowedParams = zodParse(Task.InputParam, req.params);

  await axios
    .get(`https://jsonplaceholder.typicode.com/todos/${allowedParams.jsonId}`)
    .then(async (result) => {
      const {
        data: { id, ...rest },
      } = result;

      const allowed = zodParse(Task.InputSchema, rest);

      const task = new Task.Model(allowed);
      await task.save();

      sendSuccess(res, 201, { data: task });
    })
    .catch((error) => {
      throw error;
    });
};

module.exports = { createTodo };
