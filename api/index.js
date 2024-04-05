import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";

const app = express();

dotenv.config();

mongoose
  .connect(process.env.REACT_APP_MONGO_URL)
  .then(() => {
    console.log("conncted Db");
  })
  .catch((error) => console.log(error));

const port = 3000;
app.listen(port, () => {});

app.use("/api/user", userRouter);
