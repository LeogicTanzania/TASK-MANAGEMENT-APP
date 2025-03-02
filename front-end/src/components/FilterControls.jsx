import React from "react";

export const FilterControls = ({ filter, setFilter }) => {
  return (
    <div className="filter-controls">
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All Tasks</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>
    </div>
  );
};
