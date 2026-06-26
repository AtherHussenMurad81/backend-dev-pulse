import { pool } from "../../db";
import type { NewIssue } from "../../types";
import authService from "./auth.service";

class IssuesService {
  async createIssue({
    title,
    description,
    type,
    status,
    reporter_id,
  }: NewIssue) {
    const user = await authService.getUserById(reporter_id);

    if (!user) {
      throw new Error("User not found");
    }

    const result = await pool.query(
      `
      INSERT INTO issues (
        title,
        description,
        type,
        status,
        reporter_id
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
      `,
      [title, description, type, status, reporter_id],
    );

    return result.rows[0];
  }
}

export default new IssuesService();
