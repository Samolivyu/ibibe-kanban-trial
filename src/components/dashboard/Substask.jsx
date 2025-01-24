import React, { useState, useMemo } from 'react';
import { Calendar, Users, Trash, Menu, X, Plus, Edit2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import './subtask.css';

const Subtask = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ 
    title: '', 
    status: 'To Do', 
    assignees: [], 
    subTasks: [] 
  });
  const [editingSubtask, setEditingSubtask] = useState(null);
  const [newSubtask, setNewSubtask] = useState({
    title: '',
    status: 'To Do',
    assignee: '',
    dueDate: new Date().toISOString().split('T')[0] // Default to today's date
  });
  const [selectedUser , setSelectedUser ] = useState(null); // State for selected user
  
  const users = Array.from({ length: 10 }, (_, i) => `User  ${i + 1}`);
  const statusOptions = ['To Do', 'In Progress', 'Review', 'Done'];

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleAddTask = () => {
    if (!newTask.title) return;
    setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
    setNewTask({ title: '', status: 'To Do', assignees: [], subTasks: [] });
  };

  const handleAddSubTask = (taskId) => {
    if (!newSubtask.title || !newSubtask.assignee) return;
    
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subTasks: [
                ...task.subTasks,
                {
                  id: task.subTasks.length + 1,
                  title: newSubtask.title,
                  assignee: newSubtask.assignee,
                  status: newSubtask.status,
                  dueDate: newSubtask.dueDate
                }
              ]
            }
          : task
      )
    );
    setNewSubtask({ 
      title: '', 
      status: 'To Do', 
      assignee: '', 
      dueDate: new Date().toISOString().split('T')[0] 
    });
  };

  const handleEditSubtask = (taskId, subtaskId, updatedSubtask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subTasks: task.subTasks.map((subtask) =>
                subtask.id === subtaskId ? { ...subtask, ...updatedSubtask } : subtask
              )
            }
          : task
      )
    );
    setEditingSubtask(null);
  };

  const handleRemoveSubtask = (taskId, subtaskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subTasks: task.subTasks.filter((subtask) => subtask.id !== subtaskId)
            }
          : task
      )
    );
  };

  const handleViewMemberTasks = (user) => {
    setSelectedUser (user); // Set the selected user
    closeMenu();
  };

  // Show all tasks or filter by selected user
  const filteredTasks = useMemo(() => {
    if (selectedUser ) {
      return tasks.filter(task => task.assignees.includes(selectedUser ) || 
        task.subTasks.some(subtask => subtask.assignee === selectedUser ));
    }
    return tasks;
  }, [tasks, selectedUser ]);

  return (
    <div className={`dashboard-container ${menuOpen ? 'menu-open' : ''}`}>
      {/* Hamburger Menu */}
      <div className="menu-trigger">
        <button onClick={toggleMenu} className="p-2">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <div className={`hamburger-menu ${menuOpen ? 'open' : ''}`}>
        <div className="hamburger-header flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Task Filters</h2>
          <button 
            onClick={closeMenu}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>
        <div className="hamburger-content p-4">
          <button 
            onClick={() => {
              setSelectedUser (null); // Reset selected user to show all tasks
              closeMenu();
            }}
            className="w-full text-left p-2 hover:bg-gray-100 rounded mb-2"
          >
            All Tasks
          </button>
          <div className="user-links space-y-1">
            {users.map((user) => (
              <button
                key={user}
                onClick={() => handleViewMemberTasks(user)}
                className="block w-full text-left p-2 hover:bg-gray-100 rounded transition-colors"
              >
                Tasks for {user}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Task Form */}
      <div className="space-y-4 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="p-2 border rounded"
          />
          <select 
            onChange={(e) => setNewTask({ ...newTask, assignees: [e.target.value] })}
            className="p-2 border rounded"
          >
            <option value="">Select Assignee</option>
            {users.map((user) => (
              <option key={user} value={user}>{user}</option>
            ))}
          </select>
          <button 
            onClick={handleAddTask}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-6 p-4">
        {filteredTasks.map((task) => (
          <div key={task.id} className="border rounded p-4">
            <h3 className="text-lg font-bold mb-4" style={{ color: 'black' }} >{task.title}</h3>
            
            {/* Add Subtask Form */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Subtask Title"
                value={newSubtask.title}
                onChange={(e) => setNewSubtask({ ...newSubtask, title: e.target.value })}
                className="p-2 border rounded"
              />
              <select
                value={newSubtask.status}
                onChange={(e) => setNewSubtask({ ...newSubtask, status: e.target.value })}
                className="p-2 border rounded"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <select
                value={newSubtask.assignee}
                onChange={(e) => setNewSubtask({ ...newSubtask, assignee: e.target.value })}
                className="p-2 border rounded"
              >
                <option value="">Assign to</option>
                {users.map((user) => (
                  <option key={user} value={user}>{user}</option>
                ))}
              </select>
              <input
                type="date"
                value={newSubtask.dueDate}
                onChange={(e) => setNewSubtask({ ...newSubtask, dueDate: e.target.value })}
                className="p-2 border rounded"
              />
              <button
                onClick={() => handleAddSubTask(task.id)}
                className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                <Plus size={20} />
              </button>
            </div>

            {/* Subtasks List */}
            <div className="space-y-2">
              {task.subTasks.map((subTask) => (
                <div key={subTask.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  {editingSubtask === subTask.id ? (
                    <>
                      <input
                        type="text"
                        value={subTask.title}
                        onChange={(e) => handleEditSubtask(task.id, subTask.id, { title: e.target.value })}
                        className="p-1 border rounded"
                      />
                      <select
                        value={subTask.status}
                        onChange={(e) => handleEditSubtask(task.id, subTask.id, { status: e.target.value })}
                        className="p-1 border rounded"
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                      <select
                        value={subTask.assignee}
                        onChange={(e) => handleEditSubtask(task.id, subTask.id, { assignee: e.target.value })}
                        className="p-1 border rounded"
                      >
                        {users.map((user) => (
                          <option key={user} value={user}>{user}</option>
                        ))}
                      </select>
                      <input
                        type="date"
                        value={subTask.dueDate}
                        onChange={(e) => handleEditSubtask(task.id, subTask.id, { dueDate: e.target.value })}
                        className="p-1 border rounded"
                      />
                      <button
                        onClick={() => setEditingSubtask(null)}
                        className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="flex-1">{subTask.title}</span>
                      <span className="px-2 py-1 bg-blue-100 rounded">{subTask.status}</span>
                      <span className="px-2 py-1 bg-gray-100 rounded">{subTask.assignee}</span>
                      <span className="px-2 py-1 bg-yellow-100 rounded">{subTask.dueDate}</span>
                      <button
                        onClick={() => setEditingSubtask(subTask.id)}
                        className="p-1 text-blue-500 hover:text-blue-600"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleRemoveSubtask(task.id, subTask.id)}
                        className="p-1 text-red-500 hover:text-red-600"
                      >
                        <Trash size={16} />
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subtask;