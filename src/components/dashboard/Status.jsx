import React from "react";

const Status = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Done":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Under Review":
        return "bg-purple-100 text-purple-800";
      case "Overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return <span className={`status-badge ${getStatusColor(status)}`}>{status}</span>;
};

export default Status;
