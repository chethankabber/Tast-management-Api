
import Task from "../models/Task.js";

export const getTask = async (req, res) => {
  try {
    const {
      status,
      priority,
      sortBy = "date",     
      sortOrder = "desc",  
      startDate,
      endDate,
      page = 1,
      limit = 10,
      search
    } = req.query;

    const query = {};

    // Filtering
    if (status) query.status = status;
    if (priority) query.priority = priority;

    // Searching
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { desc: { $regex: search, $options: "i" } }
      ];
    }

    // Date filtering
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    // Sorting
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const tasks = await Task.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//////////////////////////////////////////////////////////////////////////////

export const addTask = async (req, res) => {
  try {
    const { title, desc, status, date, priority} = req.body;

    if (!title || !desc || !status) {
      return res.status(400).json({ error: "Title, desc, and status are required." });
    }

    const newTask = new Task({
      title,
      desc,
      status,
      date: date || new Date(),
      priority: priority || "M"
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

///////////////////////////////////////////////////////////////////////////////////////



export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, desc, status, date, priority, dueDate } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, desc, status, date, priority, dueDate },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

////////////////////////////////////////////////////////////////////////////////


export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
///////////////////////////////////////////////////////////////////////////

export const patchTask = async (req, res) => {      //PATCH modifies only specified fields of a resource.
  const { id } = req.params;
  const updates = req.body;

  try {
    const patchedTask = await Task.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    );

    if (!patchedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(patchedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
