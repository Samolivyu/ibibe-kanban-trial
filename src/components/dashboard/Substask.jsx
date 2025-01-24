import React, { useState, useMemo } from 'react';
import { Menu, X, Users, Trash, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './subtask.css';

const Subtask = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const users = Array.from({ length: 10 }, (_, i) => ({ text: `User ${i + 1}`, value: `User ${i + 1}` }));
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Subtask Example',
      assignee: 'User 1',
      status: 'In Progress',
      dueDate: '2025-02-15',
    },
  ]);
  const [newTask, setNewTask] = useState({
    title: '',
    assignee: '',
    status: 'To Do',
    dueDate: '',
  });

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleAddTask = () => {
    if (!newTask.title || !newTask.assignee || !newTask.dueDate) return;
    setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
    setNewTask({ title: '', assignee: '', status: 'To Do', dueDate: '' });
  };

  const filteredTasks = useMemo(() => tasks, [tasks]);

  return (
    <div className={`subtask-container ${menuOpen ? 'menu-open' : ''}`}>
      {/* Hamburger Menu */}
      <button className="menu-trigger" onClick={toggleMenu} aria-expanded={menuOpen}>
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {menuOpen && (
        <div className="hamburger-menu">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Menu</h2>
            <button
              className="menu-button"
              onClick={() => navigate('/dashboard')}
            >
              Home
            </button>
            <button
              className="menu-button"
              onClick={() => navigate('/')}
            >
              Logout
            </button>
            <button className="menu-close-button" onClick={toggleMenu}>
              Close Menu
            </button>
          </div>
        </div>
      )}

      {/* Task Input Form */}
      <div className="task-form">
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="form-input"
        />
        <select
          value={newTask.assignee}
          onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
          className="form-input"
        >
          <option value="">Select User</option>
      {users.map((user) => (
        <option key={user.value} value={user.value}>
          {user.text}
        </option>
          ))}
        </select>
        <input
          type="date"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          className="form-input"
        />
        <button onClick={handleAddTask} className="add-task-button">
          Add Task
        </button>
      </div>

      {/* User Output Table */}
      <table className="subtask-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Assignee</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.assignee}</td>
              <td>{task.status}</td>
              <td>{task.dueDate}</td>
              <td>
                <button className="edit-button">
                  <Edit size={16} />
                </button>
                <button className="delete-button" onClick={() => setTasks(tasks.filter((t) => t.id !== task.id))}>
                  <Trash size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Subtask;
