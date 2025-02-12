import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ShowTask = ({ tasks = [] }) => {
  const [userFilter, setUserFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const navigate = useNavigate();

  const filteredTasks = tasks.filter((task) => {
    const matchesUser = userFilter ? task.user.toLowerCase().includes(userFilter.toLowerCase()) : true;
    const matchesDate = dateFilter ? task.dueDate === dateFilter : true;
    const matchesStatus = statusFilter ? task.status === statusFilter : true;
    return matchesUser && matchesDate && matchesStatus;
  });

  const logout = () => {
    navigate("/");
  };

  return (
    <div className="show-task">
      <div className="show-task-header">
        <h1>Show Tasks</h1>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>
      <div className="filter-section">
        <input
          type="text"
          placeholder="Search by user"
          value={userFilter}
          onChange={(e) => setUserFilter(e.target.value)}
        />
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Statuses</option>
          {["To Do", "In Progress", "Under Review", "Overdue", "Done"].map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      {filteredTasks.length > 0 ? (
        <table className="task-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th> {/* New column for description */}
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <React.Fragment key={task.id}>
                <tr>
                  <td>{task.title}</td>
                  <td>{task.description}</td> {/* Render task description */}
                  <td>{task.user}</td>
                  <td>{task.role}</td>
                  <td>
                    <span className={`status ${task.status.replace(/\s/g, "-").toLowerCase()}`}>
                      {task.status}
                    </span>
                  </td>
                  <td>{task.dueDate}</td>
                </tr>
                {task.subtasks && task.subtasks.length > 0 && (
                  <tr className="subtask-row">
                    <td colSpan="6">
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
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tasks match your filters.</p>
      )}
    </div>
  );
};

export default ShowTask;