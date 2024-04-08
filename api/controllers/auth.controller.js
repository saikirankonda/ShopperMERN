import User from "../Models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utilis/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const singup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json("User Creates Successfully ");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validateUser = await User.findOne({ email });
    console.log(validateUser);
    if (!validateUser) {
      return next(errorHandler(404, "User not found...!"));
    }
    const validateUserPassword = bcryptjs.compareSync(
      password,
      validateUser.password
    );
    console.log(validateUserPassword);
    if (!validateUserPassword) {
      return next(errorHandler(401, "Wrong Credentials...!"));
    }

    const token = jwt.sign({ id: validateUser }, process.env.JWT_SECREATE);
    const { password: pass, ...rest } = validateUser?._doc;

    res
      .cookie("access-token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
