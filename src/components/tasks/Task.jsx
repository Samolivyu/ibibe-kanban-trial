// src/components/Task.jsx
import React, { useState } from 'react';

const Task = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState({
    title: '',
    role: '',
    description: '',
    status: '',
    dueDate: ''
  });

  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};
    if (!newTask.title) newErrors.title = 'Title is required.';
    if (!newTask.role) newErrors.role = 'Role is required.';
    if (!newTask.description) newErrors.description = 'Description is required.';
    if (!newTask.status) newErrors.status = 'Status is required.';
    if (!newTask.dueDate) {
      newErrors.dueDate = 'Due Date is required.';
    } else if (new Date(newTask.dueDate) < new Date()) {
      newErrors.dueDate = 'Due Date cannot be in the past.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) {
      onAddTask(newTask);
      setNewTask({
        title: '',
        role: '',
        description: '',
        status: '',
        dueDate: ''
      });
      setErrors({});
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          value={newTask.title}
          placeholder="Title"
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        {errors.title && <span className="error">{errors.title}</span>}
      </div>
      <div>
        <input
          type="text"
          value={newTask.role}
          placeholder="Role"
          onChange={(e) => setNewTask({ ...newTask, role: e.target.value })}
        />
        {errors.role && <span className="error">{errors.role}</span>}
      </div>
      <div>
        <input
          type="text"
          value={newTask.description}
          placeholder="Description"
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        {errors.description && <span className="error">{errors.description}</span>}
      </div>
      <div>
        <select
          value={newTask.status}
          onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
        >
          <option value="">Select Status</option>
          {['To Do', 'In Progress', 'Under Review', 'Overdue', 'Done'].map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        {errors.status && <span className="error">{errors.status}</span>}
      </div>
      <div>
        <input
          type="date"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
        />
        {errors.dueDate && <span className="error">{errors.dueDate}</span>}
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default Task;
