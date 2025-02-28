const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// GET all tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// POST/Create new task
router.post("/tasks", async (req, res) => {
  try {
    const { title, description, deadline } = req.body;
    const newTask = new Task({
      title,
      description,
      deadline,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// PUT/Update the task
router.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedTask = await Task.findByIdAndUpdate(id, body, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// DELETE TASK
router.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({
      message: "Task Deleted Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;
