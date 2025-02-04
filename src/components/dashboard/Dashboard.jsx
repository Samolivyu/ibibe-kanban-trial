import React, { useState, useEffect } from "react";
import Task from "./Task";
import Subtask from "./Subtask";
import Hamburger from "./Hamburger";
import usersData from "../../../src/assets/user";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", assignee: "", status: "To Do", dueDate: "" });

  useEffect(() => {
    if (Array.isArray(usersData)) {
      setUsers(usersData);
    } else {
      console.error("Users data is not an array");
    }
  }, []);

  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { ...newTask, id: Date.now(), subtasks: [] }
    ]);
  };

  const handleCreateTask = () => {
    const taskId = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    const newTaskEntry = { ...newTask, id: taskId, subtasks: [] };
    setTasks([...tasks, newTaskEntry]);
    setNewTask({ title: "", assignee: "", status: "To Do", dueDate: "" });
  };

  const handleAddSubtask = (taskId, newSubtask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, subtasks: [...task.subtasks, { ...newSubtask, id: Date.now() }] }
          : task
      )
    );
  };

  return (
    <div className="dashboard-container">
      <Hamburger />

      {/* Add New Task Form */}
      <div className="add-task-form">
        <h3>Add New Task</h3>
        <input
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          placeholder="Task Title"
        />
        <select
          value={newTask.assignee}
          onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
        >
          {users.map((user) => (
            <option key={user.id} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>
        <select
          value={newTask.status}
          onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
        >
          {["To Do", "In Progress", "Under Review", "Overdue", "Done"].map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        <input
          type="date"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
        />
        <button onClick={handleCreateTask}>Add Task</button>
      </div>

      <Task tasks={tasks} setTasks={setTasks} users={users} />
      <Subtask tasks={tasks} setTasks={setTasks} users={users} />
    </div>
  );
};

export default Dashboard;