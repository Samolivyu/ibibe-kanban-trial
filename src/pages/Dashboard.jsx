import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Hamburger from "../pages/Hamburger";
import Subtask from "../components/tasks/Subtask";

// Updated options for dropdowns.
const userOptions = ["User 1", "User 2", "User 3", "User 4", "User 5"];
const roleOptions = ["Tester", "Unity dev", "Back-end", "Front-end", "API dev"];
const statusOptions = ["To Do", "In Progress", "Under Review", "Done"];

const Dashboard = ({ tasks = [], onAddTask, onUpdateTask, onDeleteTask, onAddSubtask }) => {
  const navigate = useNavigate();

  // State for the task form, including a description field.
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    user: "",
    role: "",
    status: "",
    dueDate: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [openSubtaskForms, setOpenSubtaskForms] = useState({});

  // Validate the task form.
  const validateForm = () => {
    const errors = {};
    if (!formData.title) errors.title = "Title is required.";
    if (!formData.description) errors.description = "Description is required.";
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

  // Handle adding a new task.
  const handleAdd = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onAddTask(formData);
      setFormData({
        title: "",
        description: "",
        user: "",
        role: "",
        status: "",
        dueDate: ""
      });
      setFormErrors({});
    }
  };

  // Toggle display of the subtask form for a given task.
  const toggleSubtaskForm = (taskId) => {
    setOpenSubtaskForms({
      ...openSubtaskForms,
      [taskId]: !openSubtaskForms[taskId]
    });
  };

  // Toggle edit mode for a task.
  const handleEditToggle = (task) => {
    onUpdateTask({ ...task, isEditing: !task.isEditing });
  };

  // Save the updated task after editing.
  const handleSave = (task) => {
    if (!task.title || !task.description || !task.user || !task.role || !task.status || !task.dueDate) {
      alert("All fields are required.");
      return;
    }
    onUpdateTask({ ...task, isEditing: false });
  };

  // Logout function that redirects to the home page.
  const logout = () => {
    navigate("/");
  };

  return (
    <div >
      <Hamburger />
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>

      {/* Form to add a new task */}
      <form onSubmit={handleAdd} className="task-form">
        <table className="task-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
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
                <input
                  type="text"
                  value={formData.description}
                  placeholder="Description"
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
                {formErrors.description && <span className="error">{formErrors.description}</span>}
              </td>
              <td>
                <select
                  value={formData.user}
                  onChange={(e) => setFormData({ ...formData, user: e.target.value })}
                >
                  <option value="">Select User</option>
                  {userOptions.map((user) => (
                    <option key={user} value={user}>{user}</option>
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
                    <option key={role} value={role}>{role}</option>
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
                    <option key={status} value={status}>{status}</option>
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

      {/* Task listing */}
      <table className="task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th> 
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
              <React.Fragment key={task.id}>
                <tr>
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
                        <input
                          type="text"
                          value={task.description || ""}
                          onChange={(e) =>
                            onUpdateTask({ ...task, description: e.target.value })
                          }
                          placeholder="Enter description..."
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
                            <option key={user} value={user}>{user}</option>
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
                            <option key={role} value={role}>{role}</option>
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
                            <option key={status} value={status}>{status}</option>
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
                        <button className="save-btn" onClick={() => handleSave(task)}>Save</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{task.title}</td>
                      <td>{task.description}</td>
                      <td>{task.user}</td>
                      <td>{task.role}</td>
                      <td>
                        <span className={`status ${task.status.replace(/\s/g, "-").toLowerCase()}`}>
                          {task.status}
                        </span>
                      </td>
                      <td>{task.dueDate}</td>
                      <td>
                        <button className="edit-btn" onClick={() => handleEditToggle(task)}>Edit</button>
                        <button className="delete-btn" onClick={() => onDeleteTask(task.id)}>Delete</button>
                        <button
                          className="add-btn"
                          onClick={() => toggleSubtaskForm(task.id)}
                        >
                          {openSubtaskForms[task.id] ? "Cancel Subtask" : "Add Subtask"}
                        </button>
                      </td>
                    </>
                  )}
                </tr>
                {task.subtasks && task.subtasks.length > 0 && (
                  <tr className="subtask-row">
                    <td colSpan="7">
                      <div className="subtask-list">
                        {task.subtasks.map((sub) => (
                          <div key={sub.id} className="subtask-item">
                            <strong>Subtask for {task.title}:</strong> {sub.title} | Assigned to: {sub.user} | Status:{" "}
                            <span className={`status ${sub.status.replace(/\s/g, "-").toLowerCase()}`}>
                              {sub.status}
                            </span>{" "}
                            | Due: {sub.dueDate}
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
                {openSubtaskForms[task.id] && (
                  <tr className="subtask-form-row">
                    <td colSpan="7">
                      <Subtask parentTask={task} onAddSubtask={onAddSubtask} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No tasks available</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="view-tasks-btn-container">
        <button onClick={() => navigate("/showtask")} className="view-tasks-btn">
          View Tasks
        </button>
      </div>
    </div>
  );
};

export default Dashboard;