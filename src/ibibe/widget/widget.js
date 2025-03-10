// src/components/Widget.jsx
import React from 'react';
 
const Widget = ({ data }) => {
  return (
    <div className="widget p-4 bg-white shadow rounded">
      <h3 className="font-bold text-lg">Dashboard Widget</h3>
      <p>Total Tasks: {data.totalTasks}</p>
      <p>Tasks Completed: {data.completedTasks}</p>
      {/* Additional widget details */}
    </div>
  );
};
 
export default Widget;