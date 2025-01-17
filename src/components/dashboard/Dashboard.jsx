import React, { useState } from 'react';
import { Calendar, Clock, Users, Plus, Trash, Edit } from 'lucide-react';
import './dashboard.css'

const Dashboard = () => {
  // Initialize state with a sample task that includes the new status options
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'TESTING THE UI',
      status: 'In Progress',
      assignees: ['Admin', 'User 1'],
      dueDate: '2025-02-01',
      description: 'Developing the new user dashboard'
    }
  ]);

  const [newTask, setNewTask] = useState({
    title: '',
    status: 'To Do',
    assignees: [],
    dueDate: '',
    description: ''
  });

  const [isEditing, setIsEditing] = useState(null);

  // Define all possible status options
  const statusOptions = ['To Do', 'In Progress', 'Under Review', 'Overdue', 'Done'];

  // Helper function to determine status color
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
    if (newTask.title && newTask.dueDate) {
      setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
      setNewTask({
        title: '',
        status: 'To Do',
        assignees: [],
        dueDate: '',
        description: ''
      });
    }
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleEditTask = (task) => {
    setIsEditing(task.id);
    setNewTask(task);
  };

  const handleUpdateTask = () => {
    setTasks(tasks.map(task => 
      task.id === isEditing ? newTask : task
    ));
    setIsEditing(null);
    setNewTask({
      title: '',
      status: 'To Do',
      assignees: [],
      dueDate: '',
      description: ''
    });
  };

  // Calculate task counts by status
  const statusCounts = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="p-4 max-w-6xl mx-auto space-y-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Welcome to the Ibibe Task Manager!</h2>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Task title"
            value={newTask.title}
            onChange={(e) => setNewTask({...newTask, title: e.target.value})}
            className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
            className="w-40 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Assignees (comma-separated)"
            value={newTask.assignees.join(', ')}
            onChange={(e) => setNewTask({...newTask, assignees: e.target.value.split(',').map(s => s.trim())})}
            className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={newTask.status}
            onChange={(e) => setNewTask({...newTask, status: e.target.value})}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {Object.entries(statusCounts).map(([status, count]) => (
            <div key={status} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="text-lg font-semibold text-gray-700">{status}</div>
              <div className="text-2xl font-bold text-gray-900">{count} tasks</div>
            </div>
          ))}
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignees</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tasks.map(task => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      {task.assignees.length}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {task.dueDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditTask(task)}
                        className="p-2 text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="p-2 text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-md"
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