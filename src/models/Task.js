//Task.js

import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  status: {
    type: String,
    enum: ["todo", "in-progress", "completed"], 
    default: "todo",
    required: true,
  },
  priority: {
    type: String,
    enum: ["L", "M", "H"],
    default: "M",
  },
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Task", TaskSchema);
