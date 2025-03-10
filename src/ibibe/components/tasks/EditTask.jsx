import React from "react";
import { Edit } from "lucide-react";
import "../../../style.css";

const EditTask = ({ currentTask, setCurrentTask, setTasks }) => {
  return (
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
  );
};

export default EditTask;
