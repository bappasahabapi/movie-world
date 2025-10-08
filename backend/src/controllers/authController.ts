import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

const genToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "Email already in use" });
  const user = await User.create({ name, email, password });
  res.json({
    token: genToken(user._id.toString()),
    user: { id: user._id, name: user.name, email: user.email },
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  res.json({
    token: genToken(user._id.toString()),
    user: { id: user._id, name: user.name, email: user.email },
  });
};

export const me = async (req: Request, res: Response) => {
  // @ts-ignore
  const user = await User.findById(req.userId).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};
