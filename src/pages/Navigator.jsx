// src/pages/Navigator.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navigator = ({ tasks = [] }) => {
  const navigate = useNavigate();

  // Handle task click based on its status
  const handleTaskClick = (task) => {
    let route = `/tasks/${task.id}`; // fallback route
    switch (task.status) {
      case 'To Do':
        route = `/tasks/todo/${task.id}`;
        break;
      case 'In Progress':
        route = `/tasks/in-progress/${task.id}`;
        break;
      case 'Under Review':
        route = `/tasks/under-review/${task.id}`;
        break;
      case 'Overdue':
        route = `/tasks/overdue/${task.id}`;
        break;
      case 'Done':
        route = `/tasks/done/${task.id}`;
        break;
      default:
        break;
    }
    navigate(route);
  };

  // Define the statuses for which pages exist
  const statuses = ['To Do', 'In Progress', 'Under Review', 'Overdue', 'Done'];

  return (
    <div className="task-status-navigator">
      {statuses.map((status) => {
        const filteredTasks = tasks.filter((task) => task.status === status);
        return (
          <div key={status} className="status-group">
            <h3>{status}</h3>
            {filteredTasks.length > 0 ? (
              <ul>
                {filteredTasks.map((task) => (
                  <li key={task.id} onClick={() => handleTaskClick(task)} className="task-item">
                    <span className="task-name">{task.title}</span> - 
                    <span className="task-due">Due: {task.dueDate}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No tasks in this category.</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Navigator;
