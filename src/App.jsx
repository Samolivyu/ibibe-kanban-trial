import React, { useState } from "react";
  import { Routes, Route } from "react-router-dom";
  import Home from "./components/Home";
  import Signin from "./components/Signin";
  import Signup from "./components/Signup";
  import Dashboard from "./pages/Dashboard";
  import ShowTask from "./components/tasks/ShowTask";
  import { AuthenticatedLayout } from "./components/contexts/AuthContext";
  import "./style.css";

  function App() {
    const [tasks, setTasks] = useState([]);

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

    const handleAddSubtask = (parentTaskId, subtask) => {
      setTasks(tasks.map(task => {
        if (task.id === parentTaskId) {
          return { ...task, subtasks: [...(task.subtasks || []), subtask] };
        }
        return task;
      }));
    };

    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<AuthenticatedLayout />}>
          <Route
            path="/dashboard"
            element={
              <Dashboard
                tasks={tasks}
                onAddTask={handleAddTask}
                onUpdateTask={handleUpdateTask}
                onDeleteTask={handleDeleteTask}
                onAddSubtask={handleAddSubtask}
              />
            }
          />
          <Route
            path="/showtask"
            element={<ShowTask tasks={tasks} />}
          />
        </Route>
      </Routes>
    );
  }

  export default App;