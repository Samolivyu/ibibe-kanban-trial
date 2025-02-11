// src/pages/Dashboard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Hard-coded users and roles for dropdowns (adjust as needed)
const userOptions = ["User 1", "User 2", "User 3", "User 4", "User 5"];
const roleOptions = ["Tester", "Unity dev", "Back-end", "Front-end", "API dev"];
const statusOptions = ["To Do", "In Progress", "Under Review", "Overdue", "Done"];

const Dashboard = ({ tasks, onAddTask, onUpdateTask, onDeleteTask, changePage }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    user: "",
    role: "",
    status: "",
    dueDate: ""
  });
  const [formErrors, setFormErrors] = useState({});

  // Validate fields (empty check and due date in the past)
  const validateForm = () => {
    const errors = {};
    if (!formData.title) errors.title = "Title is required.";
    if (!formData.user) errors.user = "User is required.";
    if (!formData.role) errors.role = "Role is required.";
    if (!formData.status) errors.status = "Status is required.";
    if (!formData.dueDate) {
      errors.dueDate = "Due Date is required.";
    } else if (new Date(formData.dueDate) < new Date()) {
      errors.dueDate = "Due Date cannot be in the past.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onAddTask(formData);
      setFormData({ title: "", user: "", role: "", status: "", dueDate: "" });
      setFormErrors({});
    }
  };

  // For editing a task – toggles edit mode and saves updates
  const handleEditToggle = (task) => {
    onUpdateTask({ ...task, isEditing: !task.isEditing });
  };

  const handleSave = (task, index) => {
    // Validate edited task (for simplicity, we require all fields)
    if (!task.title || !task.user || !task.role || !task.status || !task.dueDate) {
      alert("All fields are required.");
      return;
    }
    onUpdateTask({ ...task, isEditing: false });
  };

  return (
    <div className="dashboard">
      <h1>Ibibe Kanban</h1>
      
      {/* Form to add new task */}
      <form onSubmit={handleAdd} className="task-form">
        <table className="task-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="form-row">
              <td>
                <input
                  type="text"
                  value={formData.title}
                  placeholder="Title"
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
                {formErrors.title && <span className="error">{formErrors.title}</span>}
              </td>
              <td>
                <select
                  value={formData.user}
                  onChange={(e) => setFormData({ ...formData, user: e.target.value })}
                >
                  <option value="">Select User</option>
                  {userOptions.map((user) => (
                    <option key={user} value={user}>
                      {user}
                    </option>
                  ))}
                </select>
                {formErrors.user && <span className="error">{formErrors.user}</span>}
              </td>
              <td>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <option value="">Select Role</option>
                  {roleOptions.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                {formErrors.role && <span className="error">{formErrors.role}</span>}
              </td>
              <td>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="">Select Status</option>
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                {formErrors.status && <span className="error">{formErrors.status}</span>}
              </td>
              <td>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                />
                {formErrors.dueDate && <span className="error">{formErrors.dueDate}</span>}
              </td>
              <td>
                <button type="submit" className="add-btn">Add Task</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      
      {/* Tasks Table */}
      <table className="task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>User</th>
            <th>Role</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task.id}>
                {task.isEditing ? (
                  <>
                    <td>
                      <input
                        type="text"
                        value={task.title}
                        onChange={(e) =>
                          onUpdateTask({ ...task, title: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <select
                        value={task.user}
                        onChange={(e) =>
                          onUpdateTask({ ...task, user: e.target.value })
                        }
                      >
                        <option value="">Select User</option>
                        {userOptions.map((user) => (
                          <option key={user} value={user}>
                            {user}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select
                        value={task.role}
                        onChange={(e) =>
                          onUpdateTask({ ...task, role: e.target.value })
                        }
                      >
                        <option value="">Select Role</option>
                        {roleOptions.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select
                        value={task.status}
                        onChange={(e) =>
                          onUpdateTask({ ...task, status: e.target.value })
                        }
                      >
                        <option value="">Select Status</option>
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="date"
                        value={task.dueDate}
                        onChange={(e) =>
                          onUpdateTask({ ...task, dueDate: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <button className="save-btn" onClick={() => handleSave(task)}>
                        Save
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{task.title}</td>
                    <td>{task.user}</td>
                    <td>{task.role}</td>
                    <td>
                      <span className={`status ${task.status.replace(/\s/g, "-").toLowerCase()}`}>
                        {task.status}
                      </span>
                    </td>
                    <td>{task.dueDate}</td>
                    <td>
                      <button className="edit-btn" onClick={() => handleEditToggle(task)}>
                        Edit
                      </button>
                      <button className="delete-btn" onClick={() => onDeleteTask(task.id)}>
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No tasks available</td>
            </tr>
          )}
        </tbody>
      </table>
      
      {/* Button to view tasks */}
      <div className="view-tasks-btn-container">
        <button onClick={() => changePage("showtask")} className="view-tasks-btn">
          View Tasks
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
