import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
mongoose
  .connect(process.env.REACT_APP_MONGO_URL)
  .then(() => {
    console.log("conncted Db");
  })
  .catch((error) => console.log(error));

const app = express();
app.use(cors());

app.use(express.json());

const port = 3000;
app.listen(port, () => {});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statuscode = err.statuscode || 500;
  const message = err.statusmessage || "Internal Server Error";
  return res.status(statuscode).json({
    success: false,
    statuscode,
    message
  });
});
