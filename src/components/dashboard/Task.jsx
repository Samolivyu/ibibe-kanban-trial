import React, { useState } from "react";
import { Edit, Trash } from "lucide-react";
import "../../App.css";


const Task = ({ tasks = [], setTasks, users = [] }) => {
  const [currentTask, setCurrentTask] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case "To Do":
        return "status-todo";
      case "In Progress":
        return "status-in-progress";
      case "Under Review":
        return "status-under-review";
      case "Overdue":
        return "status-overdue";
      case "Done":
        return "status-done";
      default:
        return "";
    }
  };

  return (
    <div>
      {currentTask && (
        <div className="edit-form">
          <h3>Edit Task</h3>
          <input
            type="text"
            value={currentTask.title}
            onChange={(e) =>
              setCurrentTask({ ...currentTask, title: e.target.value })
            }
          />
          <select
            value={currentTask.status}
            onChange={(e) =>
              setCurrentTask({ ...currentTask, status: e.target.value })
            }
          >
            {["To Do", "In Progress", "Under Review", "Overdue", "Done"].map(
              (status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              )
            )}
          </select>
          <select
            value={currentTask.user}
            onChange={(e) =>
              setCurrentTask({ ...currentTask, user: e.target.value })
            }
          >
            {users.map((user) => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={currentTask.date}
            onChange={(e) =>
              setCurrentTask({ ...currentTask, date: e.target.value })
            }
          />
          <button
            onClick={() => {
              setTasks((prevTasks) =>
                prevTasks.map((task) =>
                  task.id === currentTask.id ? currentTask : task
                )
              );
              setCurrentTask(null);
            }}
            className="save-btn"
          >
            Save
          </button>
        </div>
      )}

      <table className="task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>User</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task.id} className={getStatusColor(task.status)}>
                <td>{task.title}</td>
                <td>{task.status}</td>
                <td>{task.user}</td>
                <td>{task.date}</td>
                <td>
                  <button onClick={() => setCurrentTask(task)}>
                    <Edit />
                  </button>
                  <button onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}>
                    <Trash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No tasks available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Task;