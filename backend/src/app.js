import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


// Serve files from the "public" directory
app.use("/uploads", express.static("public/temp"));

// routes imports
import studentRouter from "./routes/student.routes.js";
import branchRouter from "./routes/branch.routes.js";

// routes declaration
app.use("/api/v1/student", studentRouter);
app.use("/api/v1/branch", branchRouter);


export { app } 