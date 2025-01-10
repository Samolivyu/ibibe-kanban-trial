import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./dashboard.css";

const initialTasks = {
  "in-progress": [
    { id: "1", content: "Task 1", description: "In progress task", dueDate: "2025-01-15", status: "in-progress" },
  ],
  "under-review": [
    { id: "2", content: "Task 2", description: "Under review task", dueDate: "2025-01-16", status: "under-review" },
  ],
  "to-do": [
    { id: "3", content: "Task 3", description: "To-do task", dueDate: "2025-01-17", status: "to-do" },
  ],
  "completed": [
    { id: "4", content: "Task 4", description: "Completed task", dueDate: "2025-01-18", status: "completed" },
  ],
};

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [error, setError] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [tasks, setTasks] = useState(initialTasks);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setWaiting(true);
    try {
      await logout();
      navigate("/signin");
    } catch (err) {
      setError(err.message || "Failed to log out");
    }
    setWaiting(false);
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const sourceClone = Array.from(tasks[source.droppableId]);
    const [removed] = sourceClone.splice(source.index, 1);
    const destinationClone = Array.from(tasks[destination.droppableId]);
    destinationClone.splice(destination.index, 0, removed);

    setTasks((prevState) => ({
      ...prevState,
      [source.droppableId]: sourceClone,
      [destination.droppableId]: destinationClone,
    }));
  };

  return (
    <div className="dashboard">
      <h2 className="text-center mb-4">Dashboard</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Card className="mb-4">
        <Card.Body>
          <h3 className="text-center">Welcome back: {user.username}</h3>
          <h3 className="text-center">Email: {user.email}</h3>
        </Card.Body>
      </Card>
      <Button variant="link" disabled={waiting} onClick={handleLogout} className="mb-4">
        Log out
      </Button>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="dash">
          {Object.keys(tasks).map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="dash-column"
                >
                  <h4>{status.replace("-", " ").toUpperCase()}</h4>
                  {tasks[status].map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="dash-task"
                        >
                          <div className="task-title">{task.content}</div>
                          <div className="task-description">{task.description}</div>
                          <div className="task-dueDate">Due: {task.dueDate}</div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
