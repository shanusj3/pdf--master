import { NextFunction, RequestHandler } from "express";
import { hash, compare } from "bcrypt";
import User from "../models/User";
import { createToken } from "../utils/token-manager";
import { COOKI_NAME } from "../utils/constants";

//get all user .................................................................................................................................
export const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "ok", users });
  } catch (error) {
    return res.status(500).json({ cause: error });
  }
};

//user signup....................................................................................................................................
export const userSignup: RequestHandler = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(404).send("User already exist");
    const hashPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashPassword });
    await user.save();

    return res.status(201).json({
      message: "ok",
      name: user.name,
      email: user.email,
      id: user._id,
    });
  } catch (error) {
    return res.status(500).json({ message: "ERROR", cause: error });
  }
};

//user login.....................................................................................................................................
export const userLogin: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("User not registered");
    }

    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).send("Incorrect Password");
    }

    return res.status(200).json({
      message: "ok",
      name: user.name,
      email: user.email,
      id: user._id,
    });
  } catch (error) {
    return res.status(500).json({ message: "ERROR", cause: error });
  }
};

// userlogout---------------------------------------------------------------------------------------------------------------------------------------

export const userLogout: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }

    return res.status(200).json({
      message: "OK",
      name: user.name,
      email: user.email,
      id: user._id,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error });
  }
};

//getuser
export const getUser: RequestHandler = async (req, res) => {
  const userId = req.params;
  try {
    const user = await User.findById(userId);
    return res
      .status(200)
      .json({ name: user?.name, email: user?.email, id: user?._id });
  } catch (error) {
    return res.status(200).json({ message: "ERROR", cause: error });
  }
};
