// App.jsx
import React, { useState } from "react";
import Hamburger from "./src/pages/Hamburger";
import Dashboard from "./src/pages/Dashboard.jsx";
import ShowTask from "./src/components/tasks/ShowTask";
import "./style.css";


function App() {
  const [page, setPage] = useState("dashboard");
  const [tasks, setTasks] = useState([]);

  const changePage = (newPage) => {
    setPage(newPage);
  };

  const handleAddTask = (task) => {
    const newTask = { ...task, id: Date.now(), subtasks: [], isEditing: false };
    setTasks([...tasks, newTask]);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="app-container">
      {/* Hamburger as the sole navbar */}
      <Hamburger currentPage={page} changePage={changePage} />
      <div className="content">
        {page === "dashboard" && (
          <Dashboard
            tasks={tasks}
            onAddTask={handleAddTask}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            changePage={changePage}
          />
        )}
        {page === "showtask" && <ShowTask tasks={tasks} />}
      </div>
    </div>
  );
}

export default App;
