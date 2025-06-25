const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  name: String,
  description: String,
  priority: String,
  status: String,
  assignees: String,
});

module.exports = mongoose.model('Task', TaskSchema);
