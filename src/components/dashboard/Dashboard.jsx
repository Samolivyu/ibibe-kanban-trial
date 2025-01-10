import { useState } from "react";

const initialTasks = [
  { id: 1, title: "Task 1", description: "Description for Task 1", status: "To Do", dueDate: "2025-01-15" },
  { id: 2, title: "Task 2", description: "Description for Task 2", status: "In Progress", dueDate: "2025-01-20" },
  { id: 3, title: "Task 3", description: "Description for Task 3", status: "Under Review", dueDate: "2025-01-25" },
  { id: 4, title: "Task 4", description: "Description for Task 4", status: "Completed", dueDate: "2025-01-10" },
];

let Dashboard = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const statuses = ["To Do", "In Progress", "Under Review", "Completed"];

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData("taskId", task.id);
  };

  const handleDrop = (e, status) => {
    const taskId = e.dataTransfer.getData("taskId");
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === parseInt(taskId) ? { ...task, status } : task
      )
    );
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="dash-container">
      {statuses.map((status) => (
        <div
          key={status}
          className="dash-column"
          onDrop={(e) => handleDrop(e, status)}
          onDragOver={handleDragOver}
        >
          <h2>{status}</h2>
          {tasks
            .filter((task) => task.status === status)
            .map((task) => (
              <div
                key={task.id}
                className="dash-card"
                draggable
                onDragStart={(e) => handleDragStart(e, task)}
              >
                <div className="task-title">{task.title}</div>
                <div className="task-description">{task.description}</div>
                <div className="due-date">Due: {task.dueDate}</div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
