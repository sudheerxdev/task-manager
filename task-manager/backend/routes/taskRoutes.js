/**
 * Task Routes
 * Handles CRUD operations for tasks
 */

const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

/**
 * CREATE a new task
 */
router.post("/", async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }

    const task = new Task(req.body);
    const savedTask = await task.save();
    res.status(201).json(savedTask);
});


/**
 * READ all tasks
 */
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * UPDATE a task
 */
router.put("/:id", async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * DELETE a task
 */
router.delete("/:id", async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
