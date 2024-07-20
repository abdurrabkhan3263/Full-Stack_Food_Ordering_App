import express from "express";
import cors from "cors";

// App config
const app = express();

// middlewares
app.use(express.json({ limit: "16kb" }));
app.use(cors({ origin: process.env.CORS, credentials: true }));
app.use(express.static("public/temp"));

// All Routes
import foodRouter from "./routes/food.routes.js";

app.use("/api/v1/food", foodRouter);
app.use("/images", express.static("public/temp"));

export default app;
