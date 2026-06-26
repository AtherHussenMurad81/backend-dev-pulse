import { roles, type Role } from "./../types/index";
import type { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/sendResponse";
import { verifyToken } from "../utils/jwt";
import authService from "../api/services/auth.service";
// import e from "express";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return sendResponse(
        res,
        {
          message: "Token is missing",
          error: true,
        },
        401,
      );
    }

    const payload = verifyToken(token, "access");
    if (!payload) {
      return sendResponse(
        res,
        {
          message: " Invalid token",
          error: true,
        },
        401,
      );
    }

    const user = await authService.getUserById(payload.id);
    if (!user) {
      return sendResponse(
        res,
        {
          message: "User not fount",
          error: true,
        },
        404,
      );
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export const authorizeRoles = (...roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return sendResponse(
        res,
        {
          message: "Unauthorize user",
          error: true,
        },
        401,
      );
    }

    if (!roles.includes(req.user.role)) {
      return sendResponse(
        res,
        {
          message: "forbidden ",
          error: true,
        },
        403,
      );
    }
    return next();
  };
};
