const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  { 
    desc: { type: String, required: true },
    time: { type: String },
    isDone: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;