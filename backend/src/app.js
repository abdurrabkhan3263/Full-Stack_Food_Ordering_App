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
import categoryRouter from "./routes/category.routes.js";
import userRouter from "./routes/user.routes.js";

app.use("/api/v1/food", foodRouter);
app.use("/api/v1/images", express.static("public/temp"));
app.use("/api/v1/category", categoryRouter);

// User Routes
app.use("/api/v1/user", userRouter);

export default app;
