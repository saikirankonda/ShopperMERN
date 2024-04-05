import User from "../Models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utilis/error.js";

export const singup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = () => {
    if (password !== "") {
      return bcryptjs.hashSync(password, 10);
    } else {
      return password;
    }
  };
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json("User Creates Successfully ");
  } catch (error) {
    next(error);
  }
};
