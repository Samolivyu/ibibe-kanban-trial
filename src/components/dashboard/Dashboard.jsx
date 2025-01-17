import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, Users, Trash, Edit, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Core state management for tasks and UI
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Implement new feature',
      status: 'In Progress',
      assignees: ['John Smith', 'Sarah Johnson'],
      dueDate: '2025-02-01',
      description: 'Develop the new user dashboard'
    }
  ]);

  // Form state with proper default values
  const defaultTaskState = {
    title: '',
    status: 'To Do',
    assignees: [],
    dueDate: '',
    description: ''
  };

  const [newTask, setNewTask] = useState(defaultTaskState);
  const [isEditing, setIsEditing] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [assigneePopup, setAssigneePopup] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const statusOptions = ['To Do', 'In Progress', 'Under Review', 'Overdue', 'Done'];

  // Memoized filtered tasks for performance optimization
  const filteredTasks = useMemo(() => {
    if (selectedStatus === 'All') return tasks;
    return tasks.filter(task => task.status === selectedStatus);
  }, [tasks, selectedStatus]);

  // Status color mapping for visual feedback
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

  // Form validation
  const validateTask = (task) => {
    const errors = {};
    if (!task.title.trim()) errors.title = 'Title is required';
    if (!task.dueDate) errors.dueDate = 'Due date is required';
    if (new Date(task.dueDate) < new Date()) {
      errors.dueDate = 'Due date cannot be in the past';
    }
    return errors;
  };

  // Task management functions with error handling
  const handleAddTask = () => {
    try {
      const errors = validateTask(newTask);
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }

      setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
      setNewTask(defaultTaskState);
      setFormErrors({});
    } catch (error) {
      console.error('Failed to add task:', error);
      // Implement user feedback mechanism here
    }
  };

  const handleDeleteTask = (taskId) => {
    try {
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleEditTask = (task) => {
    setIsEditing(task.id);
    setNewTask(task);
    setFormErrors({});
  };

  const handleUpdateTask = () => {
    try {
      const errors = validateTask(newTask);
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }

      setTasks(tasks.map(task => 
        task.id === isEditing ? newTask : task
      ));
      setIsEditing(null);
      setNewTask(defaultTaskState);
      setFormErrors({});
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  // Improved assignee handling
  const handleAssigneesChange = (e) => {
    const assigneesArray = e.target.value
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);
    
    setNewTask({...newTask, assignees: assigneesArray});
  };

  // Calculate task counts for the dashboard
  const statusCounts = useMemo(() => {
    return tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {});
  }, [tasks]);

  // Popup management with keyboard accessibility
  const handleAssigneeClick = (event, taskId) => {
    event.stopPropagation();
    setAssigneePopup(assigneePopup === taskId ? null : taskId);
  };

  const handleAssigneeKeyPress = (e, taskId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleAssigneeClick(e, taskId);
    }
  };

  // Cleanup and click outside handling
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (assigneePopup && !event.target.closest('.assignee-popup')) {
        setAssigneePopup(null);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [assigneePopup]);

  return (
    <div className="dashboard-container">
      {/* Accessible hamburger menu */}
      <button 
        className="menu-trigger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-expanded={menuOpen}
        aria-label="Toggle menu"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Side navigation menu */}
      <div className={`hamburger-menu ${menuOpen ? 'open' : ''}`}>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Task Filters</h2>
          <div className="space-y-2">
            <button
              className={`w-full text-left p-2 rounded-md ${
                selectedStatus === 'All' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
              }`}
              onClick={() => setSelectedStatus('All')}
            >
              All Tasks
            </button>
            {statusOptions.map(status => (
              <button
                key={status}
                className={`w-full text-left p-2 rounded-md ${
                  selectedStatus === status ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedStatus(status)}
              >
                {status}
              </button>
            ))}
          </div>
          <button
            className="logout-button"
            onClick={() => navigate('/')}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        </div>

        {/* Enhanced task form with error handling */}
        <div className="task-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Task title"
              value={newTask.title}
              onChange={(e) => setNewTask({...newTask, title: e.target.value})}
              className={`form-input ${formErrors.title ? 'error' : ''}`}
            />
            {formErrors.title && <span className="error-message">{formErrors.title}</span>}
          </div>

          <div className="form-group">
            <input
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
              className={`form-input w-40 ${formErrors.dueDate ? 'error' : ''}`}
            />
            {formErrors.dueDate && <span className="error-message">{formErrors.dueDate}</span>}
          </div>

          <input
            type="text"
            placeholder="Assignees (comma-separated)"
            value={newTask.assignees.join(', ')}
            onChange={handleAssigneesChange}
            className="form-input"
          />

          <select
            value={newTask.status}
            onChange={(e) => setNewTask({...newTask, status: e.target.value})}
            className="form-input"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          <button
            onClick={isEditing ? handleUpdateTask : handleAddTask}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isEditing ? 'Update' : 'Add'} Task
          </button>
        </div>

        {/* Status summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {Object.entries(statusCounts).map(([status, count]) => (
            <div key={status} className="status-card">
              <div className="text-lg font-semibold text-gray-700">{status}</div>
              <div className="text-2xl font-bold text-gray-900">{count} tasks</div>
            </div>
          ))}
        </div>

        {/* Enhanced task table with accessibility */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="task-table" role="grid">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header" scope="col">Title</th>
                <th className="table-header" scope="col">Status</th>
                <th className="table-header" scope="col">Assignees</th>
                <th className="table-header" scope="col">Due Date</th>
                <th className="table-header" scope="col">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTasks.map(task => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="table-cell text-gray-900">{task.title}</td>
                  <td className="table-cell">
                    <span className={`status-badge ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="table-cell text-gray-500 relative">
                    <button
                      onClick={(e) => handleAssigneeClick(e, task.id)}
                      onKeyPress={(e) => handleAssigneeKeyPress(e, task.id)}
                      className="flex items-center hover:text-blue-600"
                      aria-label={`Show assignees (${task.assignees.length})`}
                    >
                      <Users className="w-4 h-4 mr-2" />
                      {task.assignees.length}
                    </button>
                    
                    {assigneePopup === task.id && (
                      <div className="assignee-popup" role="dialog" aria-label="Assignee list">
                        <h3 className="font-semibold mb-2">Assignees</h3>
                        <div className="assignee-list">
                          {task.assignees.map((assignee, index) => (
                            <div key={index} className="assignee-item">
                              <Users className="w-4 h-4" />
                              <span>{assignee}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="table-cell text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {task.dueDate}
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditTask(task)}
                        className="action-button edit-button"
                        aria-label={`Edit task: ${task.title}`}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="action-button delete-button"
                        aria-label={`Delete task: ${task.title}`}
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;