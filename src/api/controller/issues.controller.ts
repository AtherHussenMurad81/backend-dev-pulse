import type { Request, Response } from "express";
import issuesService from "../services/issues.service";
import { sendResponse } from "../../utils/sendResponse";

// Create Issue
export const createIssue = async (req: Request, res: Response) => {
  const { title, description, type } = req.body;

  const issue = await issuesService.createIssue({
    title,
    description,
    type,
    status: "open",
    reporter_id: Number(req.user.id),
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

// Get All Issues
export const getAllIssues = async (req: Request, res: Response) => {
  const { sort, type, status } = req.query;

  const issues = await issuesService.getAllIssues({
    sort: sort as string,
    type: type as string,
    status: status as string,
  });

  return sendResponse(
    res,
    {
      message: "Issues retrieved successfully",
      data: issues,
    },
    200,
  );
};

// Get Single Issue
export const getSingleIssue = async (req: Request, res: Response) => {
  const issue = await issuesService.getIssueById(String(req.params.id));

  if (!issue) {
    return sendResponse(
      res,
      {
        message: "Issue not found",
        error: true,
      },
      404,
    );
  }

  return sendResponse(
    res,
    {
      message: "Issue retrieved successfully",
      data: issue,
    },
    200,
  );
};

// Update Issue
export const updateIssue = async (req: Request, res: Response) => {
  const { title, description, type } = req.body;

  const issue = await issuesService.updateIssue(
    String(req.params.id),
    req.user.id,
    req.user.role,
    {
      title,
      description,
      type,
    },
  );

  if (!issue) {
    return sendResponse(
      res,
      {
        message: "Issue not found",
        error: true,
      },
      404,
    );
  }

  return sendResponse(
    res,
    {
      message: "Issue updated successfully",
      data: issue,
    },
    200,
  );
};

// Delete Issue
export const deleteIssue = async (req: Request, res: Response) => {
  if (req.user.role !== "maintainer") {
    return sendResponse(
      res,
      {
        message: "Access denied",
        error: true,
      },
      403,
    );
  }

  const issue = await issuesService.deleteIssue(String(req.params.id));

  if (!issue) {
    return sendResponse(
      res,
      {
        message: "Issue not found",
        error: true,
      },
      404,
    );
  }

  return sendResponse(
    res,
    {
      message: "Issue deleted successfully",
    },
    200,
  );
};
