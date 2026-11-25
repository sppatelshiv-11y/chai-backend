 
import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";
import userRouter from "./routes/user.routes.js";

dotenv.config({
    path: "./.env"
});

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Temporary body checker
app.use((req, res, next) => {
    console.log("BODY:", req.body);
    next();
});

// User routes
app.use("/api/v1/users", userRouter);

console.log("MongoDB URI loaded:", Boolean(process.env.MONGODB_URI));

// Database connection
connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(
                `Server is running on port ${process.env.PORT || 8000}`
            );
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });
