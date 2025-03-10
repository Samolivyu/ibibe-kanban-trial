import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { IndividualProject as Dashboard } from "../todoist-clone/src/components/IndividualProject";
import ShowTask from "./components/tasks/ShowTask";
import { AuthenticatedLayout } from "./components/contexts/AuthContext";
import "./style.css";

function App() {
  // Sample project data to pass to the Dashboard component
  const sampleProject = {
    projectId: 'sample-project-1',
    name: 'Sample Project'
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path="/dashboard" 
          element={
            <AuthenticatedLayout>
              <Dashboard project={sampleProject} />
            </AuthenticatedLayout>
          } 
        />
        <Route 
          path="/tasks/:id" 
          element={
            <AuthenticatedLayout>
              <ShowTask />
            </AuthenticatedLayout>
          } 
        />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </div>
  );
}

export default App;