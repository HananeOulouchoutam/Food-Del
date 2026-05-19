import express from "express";
import cors from "cors";
import dns from "node:dns";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoutes.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

// Google DNS
dns.setServers(["8.8.8.8", "8.8.4.4"]);

//app config
const app = express();
const port = 4000;

//middleware
app.use(express.json());
app.use(cors());

//db connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
