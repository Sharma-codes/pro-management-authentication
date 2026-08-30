import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//basic configurations - app.use is used as a basic middleware to parse the incoming request body and to serve static files from the "public" directory.
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser()); 

//cors configuration
app.use(
    cors({
      origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
      credentials: true,
      methods: ["GET", "POST", "PUT","PATCH", "DELETE","OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }),    
);

//import the routes

import healthCheckRouter from "./routes/healthcheck.routes.js";

import authRouter from "./routes/auth.routes.js";


app.use("/api/v1/healthcheck", healthCheckRouter);//app.use is middleware that mounts the healthCheckRouter on the "/api/v1/healthcheck" path. This means that any requests to this path will be handled by the healthCheckRouter.

app.use("/api/v1/auth", authRouter);//app.use is middleware that mounts the authRouter on the "/api/v1/auth" path. This means that any requests to this path will be handled by the authRouter.



app.get("/", (req, res) => {
    res.send("Welcome to basecampy");
});

export default app;