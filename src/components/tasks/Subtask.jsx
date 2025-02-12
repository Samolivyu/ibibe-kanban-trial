import React, { useState } from "react";

const Subtask = ({ parentTask, onAddSubtask }) => {
  const [subtaskData, setSubtaskData] = useState({
    title: "",
    description: "", // New description field added
    user: "",
    role: "",
    status: "",
    dueDate: ""
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!subtaskData.title) errors.title = "Title is required.";
    if (!subtaskData.description) errors.description = "Description is required."; // Validate description
    if (!subtaskData.user) errors.user = "User is required.";
    if (!subtaskData.role) errors.role = "Role is required.";
    if (!subtaskData.status) errors.status = "Status is required.";
    if (!subtaskData.dueDate) {
      errors.dueDate = "Due Date is required.";
    } else if (new Date(subtaskData.dueDate) < new Date()) {
      errors.dueDate = "Due Date cannot be in the past.";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onAddSubtask(parentTask.id, { 
        ...subtaskData, 
        parentTaskId: parentTask.id, 
        id: Date.now() 
      });
      // Reset all fields including the new description field.
      setSubtaskData({ title: "", description: "", user: "", role: "", status: "", dueDate: "" });
      setErrors({});
    }
  };

  return (
    <div className="subtask">
      <h4>Subtask for: {parentTask.title}</h4>
      <form onSubmit={handleSubmit} className="subtask-form">
        <input 
          type="text"
          placeholder="Subtask Title"
          value={subtaskData.title}
          onChange={(e) => setSubtaskData({ ...subtaskData, title: e.target.value })}
        />
        {errors.title && <span className="error">{errors.title}</span>}
        
        <input 
          type="text"
          placeholder="Description"  // New input field for description
          value={subtaskData.description}
          onChange={(e) => setSubtaskData({ ...subtaskData, description: e.target.value })}
        />
        {errors.description && <span className="error">{errors.description}</span>}
        
        <select
          value={subtaskData.user}
          onChange={(e) => setSubtaskData({ ...subtaskData, user: e.target.value })}
        >
          <option value="">Select User</option>
          {["User 1", "User 2", "User 3", "User 4", "User 5"].map((user) => (
            <option key={user} value={user}>{user}</option>
          ))}
        </select>
        {errors.user && <span className="error">{errors.user}</span>}
        
        <select
          value={subtaskData.role}
          onChange={(e) => setSubtaskData({ ...subtaskData, role: e.target.value })}
        >
          <option value="">Select Role</option>
          {["Tester", "Unity dev", "Back-end", "Front-end", "API dev"].map((role) => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
        {errors.role && <span className="error">{errors.role}</span>}
        
        <select
          value={subtaskData.status}
          onChange={(e) => setSubtaskData({ ...subtaskData, status: e.target.value })}
        >
          <option value="">Select Status</option>
          {["To Do", "In Progress", "Under Review", "Overdue", "Done"].map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        {errors.status && <span className="error">{errors.status}</span>}
        
        <input 
          type="date"
          value={subtaskData.dueDate}
          onChange={(e) => setSubtaskData({ ...subtaskData, dueDate: e.target.value })}
        />
        {errors.dueDate && <span className="error">{errors.dueDate}</span>}
        
        <button type="submit" className="add-btn">Add Subtask</button>
      </form>
    </div>
  );
};

Subtask.defaultProps = {
  onAddSubtask: () => {}
};

export default Subtask;