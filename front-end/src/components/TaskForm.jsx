import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiSave } from "react-icons/fi";

export const TaskForm = ({ onSubmit, onCancel, taskToEdit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: new Date(),
  });

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title,
        description: taskToEdit.description,
        deadline: new Date(taskToEdit.deadline),
      });
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      deadline: formData.deadline.toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />

      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        required
      />

      <DatePicker
        selected={new Date(formData.deadline)}
        onChange={(date) => setFormData({ ...formData, deadline: date })}
        showTimeSelect
        dateFormat="Pp"
      />

      <div className="form-actions">
        <button type="submit">
          <FiSave /> {taskToEdit ? "Update" : "Create"}
        </button>
        {taskToEdit && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};
