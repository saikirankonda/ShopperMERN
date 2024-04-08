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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validateUsetEmail = await User.findOne({ email });
    if (!validateUsetEmail) {
      return next(errorHandler(404, "User not found...!"));
    }
    const validateUserPassword = bcryptjs.compareSync(
      password,
      validateUsetEmail.password
    );
    if (!validateUserPassword) {
      return next(errorHandler(401, "Wrong Credentials...!"));
    }
  } catch (error) {
    next(error);
  }
};
