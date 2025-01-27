import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash } from "lucide-react";

const SubtaskTable = ({ subtasks, onEditSubtask, onDeleteSubtask }) => {
  return (
    <div className="subtask-table">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subtasks.map((subtask) => (
            <tr key={subtask.id}>
              <td>{subtask.title}</td>
              <td>{subtask.status}</td>
              <td>
                <button
                  onClick={() => onEditSubtask(subtask)}
                  className="edit-btn"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => onDeleteSubtask(subtask.id)}
                  className="delete-btn"
                >
                  <Trash size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Subtask = () => {
  const [subtasks, setSubtasks] = useState([
    { id: 1, title: "Subtask 1", status: "To Do" },
    { id: 2, title: "Subtask 2", status: "In Progress" },
    { id: 3, title: "Subtask 3", status: "Done" },
  ]);
  const [currentSubtask, setCurrentSubtask] = useState(null);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  // Status options for dropdown
  const statusOptions = ["To Do", "In Progress", "Done"];

  const handleEditSubtask = (subtask) => {
    setCurrentSubtask(subtask);
  };

  const handleDeleteSubtask = (subtaskId) => {
    setSubtasks(subtasks.filter((subtask) => subtask.id !== subtaskId));
  };

  const handleUpdateSubtaskStatus = (id, newStatus) => {
    setSubtasks((prevSubtasks) =>
      prevSubtasks.map((subtask) =>
        subtask.id === id ? { ...subtask, status: newStatus } : subtask
      )
    );
  };

  const users = Array.from({ length: 10 }, (_, i) => `User ${i + 1}`);

  return (
    <div className="subtask-container">
      <button
        className="hamburger-menu"
        onClick={() => setHamburgerOpen((prev) => !prev)}
      >
        ☰
      </button>

      {hamburgerOpen && (
        <div className="hamburger-dropdown">
          {users.map((user, index) => (
            <Link to="/dashboard/all" key={index} className="user-link">
              <button className="user-btn">{user}</button>
            </Link>
          ))}
          <Link to="/">
            <button className="logout-btn">Log Out</button>
          </Link>
        </div>
      )}

      <SubtaskTable
        subtasks={subtasks}
        onEditSubtask={handleEditSubtask}
        onDeleteSubtask={handleDeleteSubtask}
      />

      {currentSubtask && (
        <div className="edit-form">
          <h3>Edit Subtask</h3>
          <input
            type="text"
            value={currentSubtask.title}
            onChange={(e) =>
              setCurrentSubtask({ ...currentSubtask, title: e.target.value })
            }
          />
          <select
            value={currentSubtask.status}
            onChange={(e) =>
              setCurrentSubtask({ ...currentSubtask, status: e.target.value })
            }
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              handleUpdateSubtaskStatus(
                currentSubtask.id,
                currentSubtask.status
              );
              setCurrentSubtask(null);
            }}
            className="save-btn"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default Subtask;
