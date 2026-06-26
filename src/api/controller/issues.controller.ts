import type { Request, Response } from "express";
import issuesService from "../services/issues.service";
import { sendResponse } from "../../utils/sendResponse";

export const createIssue = async (req: Request, res: Response) => {
  const { title, description, type } = req.body;

  const reporter_id = Number(req.user.id);

  const issue = await issuesService.createIssue({
    title,
    description,
    type,
    status: "open",
    reporter_id,
  });

  return sendResponse(
    res,
    {
      message: "Issue created successfully",
      data: issue,
    },
    201,
  );
};
