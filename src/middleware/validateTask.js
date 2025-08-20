// middleware/validateTask.js
import { body, validationResult } from "express-validator";

export const validateTaskInput = [
  body("title").notEmpty().withMessage("Title is required"),
  body("desc").notEmpty().withMessage("Description is required"),
  body("status").isIn(["todo", "in-progress", "completed"]).withMessage("Invalid status"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
