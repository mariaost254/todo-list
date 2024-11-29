const express = require('express');
const {
  getAllTasks,
  addTask,
  deleteTask,
  updateTaskStatus,
} = require('../controller/taskController');

const router = express.Router();

router.get('/', getAllTasks);
router.post('/', addTask);
router.delete('/:id', deleteTask);
router.put('/:id', updateTaskStatus);

module.exports = router;