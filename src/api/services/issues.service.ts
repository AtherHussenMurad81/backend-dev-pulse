import { pool } from "../../db";
import type { NewIssue, Status } from "../../types";
import authService from "./auth.service";

class IssuesService {
  // Create Issue
  async createIssue({
    title,
    description,
    type,
    status,
    reporter_id,
  }: NewIssue) {
    const user = await authService.getUserById(String(reporter_id));

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

  // Get All Issues
  async getAllIssues(filters: {
    sort?: string;
    type?: string;
    status?: string;
  }) {
    const values: unknown[] = [];
    let query = `SELECT * FROM issues`;

    const conditions: string[] = [];

    if (filters.type) {
      values.push(filters.type);
      conditions.push(`type = $${values.length}`);
    }

    if (filters.status) {
      values.push(filters.status);
      conditions.push(`status = $${values.length}`);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(" AND ")}`;
    }

    query +=
      filters.sort === "oldest"
        ? ` ORDER BY created_at ASC`
        : ` ORDER BY created_at DESC`;

    const result = await pool.query(query, values);

    return result.rows;
  }

  // Get Issue By ID
  async getIssueById(id: string) {
    const { rows } = await pool.query(
      `
    SELECT
      i.id,
      i.title,
      i.description,
      i.type,
      i.status,
      i.created_at,
      i.updated_at,
      u.id AS reporter_id,
      u.name AS reporter_name,
      u.role AS reporter_role
    FROM issues i
    JOIN users u
      ON i.reporter_id = u.id
    WHERE i.id = $1
    `,
      [id],
    );

    if (!rows.length) return null;

    const issue = rows[0];

    return {
      id: issue.id,
      title: issue.title,
      description: issue.description,
      type: issue.type,
      status: issue.status,
      reporter: {
        id: issue.reporter_id,
        name: issue.reporter_name,
        role: issue.reporter_role,
      },
      created_at: issue.created_at,
      updated_at: issue.updated_at,
    };
  }
  async updateIssue(
    id: string,
    userId: string,
    role: string,
    data: {
      title: string;
      description: string;
      type: string;
    },
  ) {
    const { rows } = await pool.query(`SELECT * FROM issues WHERE id = $1`, [
      id,
    ]);

    if (!rows.length) {
      throw new Error("Issue not found");
    }

    const issue = rows[0];

    if (role === "contributor") {
      if (issue.reporter_id !== Number(userId) || issue.status !== "open") {
        throw new Error("You are not allowed to update this issue");
      }
    }

    const result = await pool.query(
      `
    UPDATE issues
    SET
      title = $1,
      description = $2,
      type = $3,
      updated_at = NOW()
    WHERE id = $4
    RETURNING *;
    `,
      [data.title, data.description, data.type, id],
    );

    return result.rows[0];
  }
  async deleteIssue(id: string) {
    const { rows } = await pool.query(
      `
    DELETE FROM issues
    WHERE id = $1
    RETURNING *;
    `,
      [id],
    );

    return rows[0];
  }
}

export default new IssuesService();
