// src/pages/ShowTask.jsx
import React, { useState } from "react";

const ShowTask = ({ tasks = [] }) => {
  const [userFilter, setUserFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Filter tasks based on assigned user, due date, and status
  const filteredTasks = tasks.filter((task) => {
    const matchesUser = userFilter ? task.user.toLowerCase().includes(userFilter.toLowerCase()) : true;
    const matchesDate = dateFilter ? task.dueDate === dateFilter : true;
    const matchesStatus = statusFilter ? task.status === statusFilter : true;
    return matchesUser && matchesDate && matchesStatus;
  });

  return (
    <div className="show-task">
      <h1>Show Tasks</h1>
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
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.user}</td>
                <td>{task.role}</td>
                <td>
                  <span className={`status ${task.status.replace(/\s/g, "-").toLowerCase()}`}>
                    {task.status}
                  </span>
                </td>
                <td>{task.dueDate}</td>
              </tr>
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
