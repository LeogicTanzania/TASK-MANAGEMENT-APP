import React from "react";
import { TaskItem } from "./TaskItem";

export const TaskList = ({ tasks, onEdit, onDelete, onToggleComplete }) => {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>No tasks found. Add a new task!</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
          />
        ))
      )}
    </div>
  );
};
