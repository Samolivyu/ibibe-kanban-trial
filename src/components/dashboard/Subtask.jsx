import React, { useState } from "react";
import { Edit, Trash } from "lucide-react";
import Hamburger from "./Hamburger";

const Subtask = ({ selectedUser, tasks = [], setTasks }) => {
  const [currentSubtask, setCurrentSubtask] = useState(null);
  const [newSubtask, setNewSubtask] = useState({ title: "", status: "To Do", user: "",dueDate: "", });

  const filteredTasks = tasks?.filter((task) => task.assignees?.includes(selectedUser)) || [];

  const handleCreateSubtask = (taskId) => {
    handleAddSubtask(taskId, newSubtask);
    setNewSubtask({ title: "", status: "To Do", dueDate: "" });
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

  const handleDeleteSubtask = (taskId, subtaskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, subtasks: task.subtasks.filter((sub) => sub.id !== subtaskId) }
          : task
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Done":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Under Review":
        return "bg-purple-100 text-purple-800";
      case "Overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="dashboard-container">
      <Hamburger />
      
      <div className="add-task-form">
        <h3>Add New Subtask</h3>
        <input 
          type="text" 
          value={newSubtask.title} 
          onChange={(e) => setNewSubtask({ ...newSubtask, title: e.target.value })} 
          placeholder="Subtask Title"
        />
        <select 
          value={newSubtask.status} 
          onChange={(e) => setNewSubtask({ ...newSubtask, status: e.target.value })}
        >
          {["To Do", "In Progress", "Under Review", "Overdue", "Done"].map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        <input 
          type="date" 
          value={newSubtask.dueDate} 
          onChange={(e) => setNewSubtask({ ...newSubtask, dueDate: e.target.value })} 
        />
        <button onClick={handleCreateSubtask}>Add Subtask</button>
      </div>
  
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
            {["To Do", "In Progress", "Under Review", "Overdue", "Done"].map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              setTasks((prevTasks) =>
                prevTasks.map((task) =>
                  task.id === currentSubtask.taskId
                    ? {
                        ...task,
                        subtasks: task.subtasks.map((sub) =>
                          sub.id === currentSubtask.id ? currentSubtask : sub
                        ),
                      }
                    : task
                )
              );
              setCurrentSubtask(null);
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
            <th>Due Date</th>
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
              <button onClick={() => setCurrentSubtask(task)}>
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
          <td colSpan="5">No Subtasks available</td>
        </tr>
      )}
    </tbody>
      </table>
    </div>
  );
};

export default Subtask;