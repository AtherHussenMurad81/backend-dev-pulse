import type { NextFunction, Response } from "express";

const globalErrorHandler = (
  err: unknown,
  res: Response,
  next: NextFunction,
) => {
  res.status(500).json({
    success: false,
    message: err instanceof Error ? err.message : "Internal server error",
  });
};

export default globalErrorHandler;
