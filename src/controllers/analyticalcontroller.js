
import Task from "../models/Task.js";

//GET http://localhost:3000/api/analytics/summary

// $eq	Equal to
// $ne	Not equal
// $gt	Greater than
// $lte	Less than or equal
// $gte	Greater than or equal
// $lt	Less than
// $in	In array           // $nin	Not in array
// $exists	Field exists
// $regex	Regular expression

export const getTaskAnalytics = async (req, res) => {
  try {
    const total = await Task.countDocuments();
    const completed = await Task.countDocuments({ status: "completed" });
    const inProgress = await Task.countDocuments({ status: "in-progress" });
    const todo = await Task.countDocuments({ status: "todo" });

    const overdue = await Task.countDocuments({
      dueDate: { $lt: new Date() },
      status: { $ne: "completed" },
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayTasks = await Task.countDocuments({ date: { $gte: today } });

    const completionRate =
      total === 0 ? 0 : ((completed / total) * 100).toFixed(2);

    res.json({
      total,
      completed,
      inProgress,
      todo,
      overdue,
      todayTasks,
      completionRate,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
