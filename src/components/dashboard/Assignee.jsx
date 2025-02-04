import React from "react";

const Assignee = ({ users, handleUserClick }) => {
  return (
    <div className="assignee-container">
      <h3>Assignees</h3>
      <table className="assignee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.role || "Not Assigned"}</td>
              <td>
                <button onClick={() => handleUserClick(user.id)}>View Tasks</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Assignee;
