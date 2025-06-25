import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_BASE = "http://localhost:5000/api";

function App() {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [editProjectId, setEditProjectId] = useState(null);
  const [editName, setEditName] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [taskAssignees, setTaskAssignees] = useState("");

  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskName, setEditTaskName] = useState("");
  const [editTaskDescription, setEditTaskDescription] = useState("");
  const [editTaskPriority, setEditTaskPriority] = useState("");
  const [editTaskStatus, setEditTaskStatus] = useState("");
  const [editTaskAssignees, setEditTaskAssignees] = useState("");

  const fetchProjects = async () => {
    const res = await axios.get(`${API_BASE}/projects`);
    setProjects(res.data);
  };

  const addProject = async () => {
    if (projectName.trim()) {
      const res = await axios.post(`${API_BASE}/projects`, {
        name: projectName.trim(),
      });
      setProjects([...projects, res.data]);
      setProjectName("");
    }
  };

  const deleteProject = async (id) => {
    await axios.delete(`${API_BASE}/projects/${id}`);
    setProjects(projects.filter((proj) => proj._id !== id));
    setTasks(tasks.filter((task) => task.projectId !== id));
    setSelectedProjectId(null);
  };

  const saveProjectEdit = async () => {
    const res = await axios.put(`${API_BASE}/projects/${editProjectId}`, {
      name: editName,
    });
    setProjects(
      projects.map((proj) =>
        proj._id === editProjectId ? res.data : proj
      )
    );
    setEditProjectId(null);
    setEditName("");
  };

  const openProject = async (id) => {
    setSelectedProjectId(id);
    const res = await axios.get(`${API_BASE}/tasks/${id}`);
    console.log("Fetched tasks:", res.data); // 👀 Debug log
    setTasks(res.data);
  };

  const getSelectedProject = () =>
    projects.find((proj) => proj._id === selectedProjectId);

  const backToProjects = () => {
    setSelectedProjectId(null);
    setTasks([]);
  };

  const addTask = async () => {
    if (taskName.trim()) {
      const res = await axios.post(`${API_BASE}/tasks`, {
        projectId: selectedProjectId,
        name: taskName.trim(),
        description: taskDescription.trim(),
        priority: taskPriority,
        status: taskStatus,
        assignees: taskAssignees,
      });
      setTasks([...tasks, res.data]);
      setTaskName("");
      setTaskDescription("");
      setTaskPriority("");
      setTaskStatus("");
      setTaskAssignees("");
    }
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_BASE}/tasks/${id}`);
    setTasks(tasks.filter((task) => task._id !== id));
  };

  const saveTaskEdit = async () => {
    const res = await axios.put(`${API_BASE}/tasks/${editTaskId}`, {
      name: editTaskName,
      description: editTaskDescription,
      priority: editTaskPriority,
      status: editTaskStatus,
      assignees: editTaskAssignees,
    });
    setTasks(
      tasks.map((task) => (task._id === editTaskId ? res.data : task))
    );
    setEditTaskId(null);
    setEditTaskName("");
    setEditTaskDescription("");
    setEditTaskPriority("");
    setEditTaskStatus("");
    setEditTaskAssignees("");
  };

  const startEditProject = (id, name) => {
    setEditProjectId(id);
    setEditName(name);
  };

  const startEditTask = (task) => {
    setEditTaskId(task._id);
    setEditTaskName(task.name);
    setEditTaskDescription(task.description);
    setEditTaskPriority(task.priority);
    setEditTaskStatus(task.status);
    setEditTaskAssignees(task.assignees);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="container">
      {!selectedProjectId ? (
        <>
          <h1>Project Manager</h1>
          <input
            type="text"
            placeholder="Enter project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <button className="add" onClick={addProject}>
            Add Project
          </button>
          <ul>
            {projects.map((proj) => (
              <li key={proj._id}>
                {editProjectId === proj._id ? (
                  <>
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                    <button className="add" onClick={saveProjectEdit}>
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <strong> {proj.name}</strong>
                    <button className="open" onClick={() => openProject(proj._id)}>
                      Open
                    </button>
                    <button
                      className="edit"
                      onClick={() => startEditProject(proj._id, proj.name)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete"
                      onClick={() => deleteProject(proj._id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h1>Tasks for {getSelectedProject()?.name}</h1>
          <button className="back" onClick={backToProjects}>
            ← Back to Projects
          </button>

          <div>
            <input
              type="text"
              placeholder="Task name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
            <select
              value={taskPriority}
              onChange={(e) => setTaskPriority(e.target.value)}
            >
              <option value="">Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <select
              value={taskStatus}
              onChange={(e) => setTaskStatus(e.target.value)}
            >
              <option value="">Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <input
              type="text"
              placeholder="Assignees"
              value={taskAssignees}
              onChange={(e) => setTaskAssignees(e.target.value)}
            />
            <button className="add" onClick={addTask}>
              Add Task
            </button>
          </div>

          <ul>
            {tasks.map((task) => (
              <li key={task._id}>
                {editTaskId === task._id ? (
                  <>
                    <input
                      value={editTaskName}
                      onChange={(e) => setEditTaskName(e.target.value)}
                    />
                    <input
                      value={editTaskDescription}
                      onChange={(e) => setEditTaskDescription(e.target.value)}
                      placeholder="Description"
                    />
                    <select
                      value={editTaskPriority}
                      onChange={(e) => setEditTaskPriority(e.target.value)}
                    >
                      <option value="">Priority</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                    <select
                      value={editTaskStatus}
                      onChange={(e) => setEditTaskStatus(e.target.value)}
                    >
                      <option value="">Status</option>
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Done">Done</option>
                    </select>
                    <input
                      value={editTaskAssignees}
                      onChange={(e) => setEditTaskAssignees(e.target.value)}
                      placeholder="Assignees"
                    />
                    <button className="add" onClick={saveTaskEdit}>
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <strong>{task.name}</strong>
                    {task.description && <span> ({task.description})</span>}
                    <br />
                    Priority: {task.priority} | Status: {task.status} | Assignees: {task.assignees}
                    <br />
                    <button className="edit" onClick={() => startEditTask(task)}>
                      Edit
                    </button>
                    <button className="delete" onClick={() => deleteTask(task._id)}>
                      Delete
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
