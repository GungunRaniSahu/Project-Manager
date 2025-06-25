const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

router.get('/', async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

router.post('/', async (req, res) => {
  const project = new Project({ name: req.body.name });
  await project.save();
  res.json(project);
});

router.put('/:id', async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
  res.json(project);
});

router.delete('/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Project deleted" });
});

module.exports = router;
