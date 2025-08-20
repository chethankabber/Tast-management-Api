
import express from "express";
import {createCategory, updateCategory, deleteCategory } from "../controllers/categoryController.js"

const routes = express.Router();


routes.post("/create", createCategory);
routes.put("/updateCategory/:id", updateCategory);
routes.delete("/deleteCategory/:id", deleteCategory);


export default routes;