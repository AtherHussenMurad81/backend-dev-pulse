import type { Request, Response } from "express";
import authService from "../services/auth.service";
import { sendResponse } from "../../utils/sendResponse";
import { signToken } from "../../utils/jwt";

export const signUp = async (req: Request, res: Response) => {
  //   console.log(console.log(req.body));

  const { name, email, password, role } = req.body;

  const user = await authService.createUser({
    name,
    email,
    password,
    role,
  });

  if (!user) {
    return sendResponse(res, {
      message: "Something error",
      error: true,
    });
  }

  //   console.log(user.rows);
  return sendResponse(
    res,
    {
      message: "User registered successfully",
      data: user.rows[0],
    },
    200,
  );
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  //   console.log(req.body);
  const user = await authService.validateUser(email, password);
  if (!user) {
    return sendResponse(res, { message: " Invalid User", error: true }, 401);
  }

  const { accessToken, refreshToken } = signToken(user);

  res.cookie("refreshToken", refreshToken, {
    secure: false,
    httpOnly: true,
    sameSite: "lax",
  });

  const result = {
    token: accessToken,
    user: user,
  };

  return sendResponse(res, {
    message: "Login successfully",
    data: result,
  });
};
