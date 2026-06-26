import { Router } from "express";
import { auth, authorizeRoles } from "../../middleware/auth";
import {
  createIssue,
  deleteIssue,
  getAllIssues,
  getSingleIssue,
  getSingleUser,
  updateIssue,
} from "../controller/issues.controller";

const router = Router();
router.post(
  "/issues",
  auth,
  authorizeRoles("contributor", "maintainer"),
  createIssue,
);
router.get(
  "/issues",
  auth,
  authorizeRoles("contributor", "maintainer"),
  getAllIssues,
);
router.get(
  "/issues/:id",
  auth,
  authorizeRoles("contributor", "maintainer"),
  getSingleIssue,
);
router.patch(
  "/issues/:id",
  auth,
  authorizeRoles("contributor", "maintainer"),
  updateIssue,
);
router.delete(
  "/issues/:id",
  auth,
  authorizeRoles("contributor", "maintainer"),
  deleteIssue,
);
export const issueRoute = router;
