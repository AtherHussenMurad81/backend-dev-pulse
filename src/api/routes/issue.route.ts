import { Router } from "express";
import { auth, authorizeRoles } from "../../middleware/auth";
import { createIssue } from "../controller/issues.controller";

const router = Router();
router.post(
  "/issues",
  auth,
  authorizeRoles("contributor", "maintainer"),
  createIssue,
);
export const issueRoute = router;
