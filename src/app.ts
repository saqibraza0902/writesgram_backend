import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import mongoose from "mongoose";
import BlogRoutes from "./routes/Blog.routes";
import UserRoutes from "./routes/Users.routes";
import bodyParser from "body-parser";

require("dotenv").config();
const mongoURI = process.env.MONGO_URI as string;
mongoose
  .connect(mongoURI)
  .then(async () => {
    try {
    } catch (error) {}
    console.log("DB Connected.");
  })
  .catch((err) => console.log(err));
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello, your api is working perfectly");
});
app.use("/blog", BlogRoutes);
app.use("/user", UserRoutes);
export default app;
