// src/components/Users.jsx
import React from 'react';

const Users = ({ selectedUser, onSelectUser }) => {
  const users = [
    { id: 1, name: 'User 1'},
    { id: 2, name: 'User 2'},
    { id: 3, name: 'User 3'},
    { id: 4, name: 'User 4'},
    { id: 5, name: 'User 5'},
    { id: 6, name: 'User 6'},
    { id: 7, name: 'User 7'},
    { id: 8, name: 'User 8'},
    { id: 9, name: 'User 9'},
    { id: 10, name: 'User 10'},
  ];

  return (
    <div className="user-dropdown">
      <label htmlFor="user-select">Assign User:</label>
      <select 
        id="user-select" 
        value={selectedUser || ''} 
        onChange={(e) => onSelectUser && onSelectUser(e.target.value)}
      >
        <option value="">Select a user</option>
        {users.map(user => (
          <option key={user.id} value={user.name}>{user.name}</option>
        ))}
      </select>
    </div>
  );
};

export default Users;
