const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.get('/:projectId', async (req, res) => {
  const tasks = await Task.find({ projectId: req.params.projectId });
  res.json(tasks);
});

router.post('/', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});

router.put('/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

module.exports = router;
