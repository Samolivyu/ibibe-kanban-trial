import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Card, Button } from "flowbite";
import { useAuth } from "/Users/LENOVO/Desktop/PROJECTS/SOLO LEARN/IbibeTaskManager/IbibeTaskManager/src/contexts/AuthContext.jsx";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { initialTasks, logoutHandler } from "/Users/LENOVO/Desktop/PROJECTS/SOLO LEARN/IbibeTaskManager/IbibeTaskManager/src/components/dashboard/DashboardHelper.js";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [error, setError] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [tasks, setTasks] = useState(initialTasks);
  const navigate = useNavigate();

  const handleLogout = logoutHandler(logout, navigate, setError, setWaiting);

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;

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
    <div>
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
                <div ref={provided.innerRef} {...provided.droppableProps} className="dash-column">
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
