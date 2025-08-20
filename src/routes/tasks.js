
import express from "express";
import { getTask, addTask, updateTask, deleteTask, patchTask} from "../controllers/taskController.js";
import { validateTaskInput } from "../middleware/validateTask.js";

const routes = express.Router();

routes.get("/get", getTask);
routes.post("/add", addTask);
routes.put("/update/:id", updateTask);
routes.delete("/delete/:id", deleteTask);
routes.patch("/patch/:id", patchTask);
routes.post("/addNew", validateTaskInput, addTask);

export default routes;
