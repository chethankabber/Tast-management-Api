
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRoutes from "./src/routes/auth.js";
import authTask from "./src/routes/tasks.js";
import categoryRoutes from "./src/routes/categories.js";
import analyticalRoutes from "./src/routes/anayltical.js";
import { errorHandler } from "./src/middleware/errorHandler.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL).then(() => {
    console.log("MongoDB is Connected Sucessfully!!!")
    app.listen(PORT, () => {
        console.log(`Server is Running on PORT number ${PORT}`)
    })
}).catch((error) => console.log(error.message));

app.use(cors());//middl
app.use(helmet());
app.use(express.json());

const limiter = rateLimit({ windowMs: 10 * 60 * 1000, max: 100 });
app.use(limiter);


app.use("/api/auth", authRoutes);
app.use("/api/tasks", authTask);
app.use("/api/categories", categoryRoutes);
app.use("/api/analytics", analyticalRoutes);
app.use(errorHandler)
