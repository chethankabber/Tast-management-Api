import express from "express";
import { getTaskAnalytics } from "../controllers/analyticalcontroller.js";

const router = express.Router();

router.get("/summary", getTaskAnalytics);

export default router;