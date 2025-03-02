import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export const TaskItem = ({ task, onEdit, onDelete, onToggleComplete }) => {
  return (
    <div className={`task-item ${task.isComplete ? "completed" : ""}`}>
      <div className="task-info">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <div className="task-meta">
          <span>
            Deadline:{" "}
            {new Date(task.deadline).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <label>
            <input
              type="checkbox"
              checked={task.isComplete}
              onChange={() => onToggleComplete(task._id, !task.isComplete)}
            />
            Complete
          </label>
        </div>
      </div>

      <div className="task-actions">
        <button onClick={() => onEdit(task)}>
          <FiEdit />
        </button>
        <button onClick={() => onDelete(task._id)}>
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
};
