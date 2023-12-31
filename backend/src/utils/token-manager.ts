import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { COOKI_NAME } from "./constants.js";
import env from "../utils/validEnv.js";

export const createToken = (id: string, email: string, expiresIn: any) => {
  const payload = { id, email };
  const token = jwt.sign(payload, env.JWT_SECRET, {
    expiresIn,
  });
  return token;
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies[`${COOKI_NAME}`];
  if (!token || token.trim() === "") {
    return res.status(401).json({ message: "Token Not Received" });
  }
  return new Promise<void>((resolve, reject) => {
    return jwt.verify(token, env.JWT_SECRET, (err: any, success: any) => {
      if (err) {
        reject(err.message);
        return res.status(401).json({ message: "Token Expired" });
      } else {
        resolve();
        res.locals.jwtData = success;
        return next();
      }
    });
  });
};
