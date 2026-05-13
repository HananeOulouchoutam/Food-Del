import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { create } from "node:domain";

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // cheking id the user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      res.json({
        success: false,
        message: "User doesn't exists",
      });
    }
    // check  if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = createToken(user._id);
    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

//create Token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
//register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // cheking if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      res.json({
        success: false,
        message: "User already used",
      });
    }
    //validating email format & strong password
    if (!validator.isEmail(email)) {
      res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 8) {
      res.json({
        success: false,
        message: "please enter a strong password",
      });
    }
    //hashing user password
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      name,
      email,
      password: hashPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

export { loginUser, registerUser };
