import React, { useState, useEffect } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "./api";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { FilterControls } from "./components/FilterControls";
import "./styles/App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (taskData) => {
    try {
      await createTask(taskData);
      await fetchTasks();
    } catch (error) {
      console.error("Create error:", error);
    }
  };

  const handleUpdate = async (id, taskData) => {
    try {
      await updateTask(id, taskData);
      await fetchTasks();
      setEditingTask(null);
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      await fetchTasks();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleToggleComplete = async (id, isComplete) => {
    try {
      await updateTask(id, { isComplete });
      await fetchTasks();
    } catch (error) {
      console.error("Toggle error:", error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.isComplete;
    if (filter === "incomplete") return !task.isComplete;
    return true;
  });

  if (loading) return <div>Loading tasks...</div>;

  return (
    <div className="app">
      <h1>LEOGIC TASK MANAGER</h1>
      <FilterControls filter={filter} setFilter={setFilter} />

      {editingTask ? (
        <TaskForm
          taskToEdit={editingTask}
          onSubmit={(data) => handleUpdate(editingTask._id, data)}
          onCancel={() => setEditingTask(null)}
        />
      ) : (
        <TaskForm onSubmit={handleCreate} />
      )}

      <TaskList
        tasks={filteredTasks}
        onEdit={setEditingTask}
        onDelete={handleDelete}
        onToggleComplete={handleToggleComplete}
      />
    </div>
  );
}

export default App;
