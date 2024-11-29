const Task = require('../models/taskModel');
const NotFoundError = require('../middleware/errors');

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    if (tasks.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(tasks);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching tasks' });
  }
};


const addTask = async (req, res) => {
  const { desc, time } = req.body;

  try {
    const newTask = new Task({
      desc,
      time,
      isDone: false,
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ message: 'Error adding task' });
  }
};


const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    console.log(taskId)
    const deletedTask = await Task.findOneAndDelete({ _id: taskId });
    console.log(deletedTask)
    if (!deletedTask) {
        throw new NotFoundError('Task Not Found', 404);
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { isDone } = req.body;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId },
      { isDone },
      { new: false }
    );
    if (!updatedTask) {
        throw new NotFoundError('Task Not Found', 404);
    }
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: 'Error updating task status' });
  }
};

module.exports = { getAllTasks, addTask, deleteTask, updateTaskStatus };
