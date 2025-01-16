import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const initialTasks = {
  "in-progress": [
    { id: "1", content: "Task 1", description: "In progress task", dueDate: "2025-01-15" },
  ],
  "under-review": [
    { id: "2", content: "Task 2", description: "Under review task", dueDate: "2025-01-16" },
  ],
  "to-do": [
    { id: "3", content: "Task 3", description: "To-do task", dueDate: "2025-01-17" },
  ],
  "completed": [
    { id: "4", content: "Task 4", description: "Completed task", dueDate: "2025-01-18" },
  ],
};

export default function Dashboard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [error] = useState("");
  const navigate = useNavigate(); // For navigation
  const dashboardRef = useRef(null);

  // Handle logout and navigate to login page
  const handleLogout = () => {
    // Clear user session or perform logout logic here
    navigate("/"); // Navigate to the login page
  };

  // Handle drag and drop
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
    <div className="bg-gray-100 min-h-screen p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Dashboard</h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-center">Welcome to your Dashboard!</h3>
      </div>
      <button
        className="block mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleLogout}
      >
        Log out
      </button>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-4 gap-4 mt-6">
          {Object.keys(tasks).map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-white rounded-lg shadow-md p-4"
                >
                  <h4 className="text-lg font-bold mb-4 capitalize">{status.replace("-", " ")}</h4>
                  {tasks[status].map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-gray-200 p-4 mb-4 rounded-lg shadow-sm"
                        >
                          <div className="font-semibold mb-2">{task.content}</div>
                          <div className="text-sm text-gray-600 mb-2">{task.description}</div>
                          <div className="text-sm text-red-500">Due: {task.dueDate}</div>
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
