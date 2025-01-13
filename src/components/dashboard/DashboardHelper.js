import "./dashboard.css";

export const initialTasks = {
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

export function logoutHandler(logout, navigate, setError, setWaiting) {
  return async () => {
    setWaiting(true);
    try {
      await logout();
      navigate("/signin");
    } catch (err) {
      setError(err.message || "Failed to log out");
    }
    setWaiting(false);
  };
}

