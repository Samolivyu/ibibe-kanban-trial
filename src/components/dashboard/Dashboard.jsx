import React, { useState, useMemo } from 'react';
import { Calendar, Users, Trash, Edit, Menu, X, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Implement new feature',
      status: 'In Progress',
      assignees: ['John Smith', 'Sarah Johnson'],
      dueDate: '2025-02-01',
      description: 'Develop the new user dashboard',
      subTasks: []
    },
  ]);
  const [newTask, setNewTask] = useState({ title: '', status: 'To Do', assignees: [], dueDate: '', description: '' });
  const [newSubtask, setNewSubtask] = useState({ title: '', assignee: '', dueDate: '' });
  const [formErrors, setFormErrors] = useState({});
  const [editingTask, setEditingTask] = useState(null);
  const [editingSubtask, setEditingSubtask] = useState(null);
  const statusOptions = ['To Do', 'In Progress', 'Under Review', 'Overdue', 'Done'];
  const users = Array.from({ length: 10 }, (_, i) => ({ text: `User ${i + 1}`, value: `User ${i + 1}` }));

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Done':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Under Review':
        return 'bg-purple-100 text-purple-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddTask = () => {
    if (!newTask.title) {
      setFormErrors({ title: 'Task title is required.' });
      return;
    }
    setTasks([...tasks, { ...newTask, id: tasks.length + 1, subTasks: [] }]);
    setNewTask({ title: '', status: 'To Do', assignees: [], dueDate: '', description: '' });
    setFormErrors({});
  };

  const handleAddSubtask = (taskId) => {
    if (!newSubtask.title || !newSubtask.assignee || !newSubtask.dueDate) return;
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, subTasks: [...task.subTasks, { ...newSubtask, id: task.subTasks.length + 1 }] }
          : task
      )
    );
    setNewSubtask({ title: '', assignee: '', dueDate: '' });
  };

  const handleEditTask = (taskId, updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, ...updatedTask } : task))
    );
    setEditingTask(null);
  };

  const handleEditSubtask = (taskId, subtaskId, updatedSubtask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subTasks: task.subTasks.map((sub) => (sub.id === subtaskId ? { ...sub, ...updatedSubtask } : sub)),
            }
          : task
      )
    );
    setEditingSubtask(null);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleDeleteSubtask = (taskId, subtaskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, subTasks: task.subTasks.filter((sub) => sub.id !== subtaskId) }
          : task
      )
    );
  };

  const filteredTasks = useMemo(() => tasks, [tasks]);

  return (
    <div className={`body ${menuOpen ? 'menu-open' : ''}`}>
      <button className="menu-trigger" onClick={toggleMenu} aria-expanded={menuOpen} aria-label="Toggle menu">
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {menuOpen && (
        <div className="hamburger-menu">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Task Filters</h2>
            <button className="logout-button" onClick={() => navigate('/')}>Logout</button>
            <button className="menu-close-button" onClick={toggleMenu}>Close Menu</button>
          </div>
        </div>
      )}

      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Ibibe Kanban</h2>
        </div>

        <div className="task-form">
          <input
            type="text"
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className={`form-input ${formErrors.title ? 'error' : ''}`}
          />
          {formErrors.title && <span className="error-message">{formErrors.title}</span>}

          <div className="form-group" style={{ marginBottom: '16px' }}>
            <input
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              className={`form-input w-40 ${formErrors.dueDate ? 'error' : ''}`}
            />
            {formErrors.dueDate && <span className="error-message">{formErrors.dueDate}</span>}
          </div>

          <select
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            className="form-input"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          <button onClick={handleAddTask} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Add Task
          </button>
        </div>

        <div className="task-list">
          {filteredTasks.map((task) => (
            <div key={task.id} className="task-item">
              <h3>{task.title}</h3>
              <p className={`status-badge ${getStatusColor(task.status)}`}>{task.status}</p>

              <div>
                <table className="subtask-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Assignee</th>
                      <th>Due Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {task.subTasks.map((subTask) => (
                      <tr key={subTask.id}>
                        {editingSubtask === subTask.id ? (
                          <>
                            <td>
                              <input
                                type="text"
                                value={subTask.title}
                                onChange={(e) => setEditingSubtask({ ...subTask, title: e.target.value })}
                                className="form-input"
                              />
                            </td>
                            <td>
                              <select
                                value={subTask.assignee}
                                onChange={(e) => setEditingSubtask({ ...subTask, assignee: e.target.value })}
                                className="form-input"
                              >
                                {users.map((user) => (
                                  <option key={user.value} value={user.value}>{user.text}</option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input
                                type="date"
                                value={subTask.dueDate}
                                onChange={(e) => setEditingSubtask({ ...subTask, dueDate: e.target.value })}
                                className="form-input"
                              />
                            </td>
                            <td>
                              <button
                                onClick={() => handleEditSubtask(task.id, subTask.id, editingSubtask)}
                                className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                              >
                                Save
                              </button>
                            </td>
                          </>
                        ) : (
                          <>
                            <td>{subTask.title}</td>
                            <td>
                              <button
                                onClick={() => navigate('/dashboard/all')}
                                className="user-icon-button flex items-center text-blue-600 hover:underline"
                              >
                                <Users className="w-4 h-4 mr-1" /> {subTask.assignee}
                              </button>
                            </td>
                            <td>{subTask.dueDate}</td>
                            <td>
                              <button
                                onClick={() => setEditingSubtask(subTask.id)}
                                className="p-1 text-blue-500 hover:text-blue-600"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteSubtask(task.id, subTask.id)}
                                className="p-1 text-red-500 hover:text-red-600"
                              >
                                <Trash size={16} />
                              </button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Subtask Title"
                  value={newSubtask.title}
                  onChange={(e) => setNewSubtask({ ...newSubtask, title: e.target.value })}
                  className="form-input"
                />
                <select
                  value={newSubtask.assignee}
                  onChange={(e) => setNewSubtask({ ...newSubtask, assignee: e.target.value })}
                  className="form-input"
                >
                  <option value="">Select Assignee</option>
                  {users.map((user) => (
                    <option key={user.value} value={user.value}>{user.text}</option>
                  ))}
                </select>
                <input
                  type="date"
                  value={newSubtask.dueDate}
                  onChange={(e) => setNewSubtask({ ...newSubtask, dueDate: e.target.value })}
                  className="form-input"
                />
                <button
                  onClick={() => handleAddSubtask(task.id)}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Add Subtask
                </button>
              </div>
              <div className="task-assignees">
                {task.assignees.map((assignee, index) => (
                  <button
                    key={index}
                    onClick={() => navigate('/dashboard/all')}
                    className="user-icon-button flex items-center text-blue-600 hover:underline"
                  >
                    <Users className="w-4 h-4 mr-1" /> {assignee}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
