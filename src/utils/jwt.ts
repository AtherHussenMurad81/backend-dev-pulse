import { RUser } from "./../types/index";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { config } from "../config";

export const verifyToken = (token: string, type: "access" | "refresh") => {
  const secret = type === "refresh" ? config.refresh : config.access;

  const decoded = jwt.verify(token, secret) as JwtPayload;
  return decoded;
};

export const signToken = (payload: RUser) => {
  const accessToken = jwt.sign(payload, config.access, {
    expiresIn: "7d",
  });
  const refreshToken = jwt.sign(payload, config.refresh, {
    expiresIn: "30d",
  });
  return { accessToken, refreshToken };
};
