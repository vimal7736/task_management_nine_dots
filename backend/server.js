import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import taskRoutes from "./routes/taskRoutes.js";
import cors from 'cors';


dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin:"http://localhost:3000",
    // credentials:'include'
}))

const port = process.env.PORT || 8000;

app.use("/api/users", userRoutes);
app.use('/api/tasks', taskRoutes)

app.get("/", (req, res) => res.send("API is running"));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
