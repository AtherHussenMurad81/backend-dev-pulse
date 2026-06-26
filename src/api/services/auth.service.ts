import bcrypt from "bcrypt";
import type { RUser, User } from "../../types";
import { pool } from "../../db";

class AuthService {
  async hashPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  async createUser(
    user: RUser & {
      password: string;
    },
  ) {
    const { name, email, password, role } = user;

    const password_hash = await this.hashPassword(password);

    const result = await pool.query(
      `
  INSERT INTO users (name, email, password, role)
  VALUES ($1, $2, $3, COALESCE($4, 'contributor'))
  RETURNING *;
  `,
      [name, email, password_hash, role],
    );
    // delete.password_hash
    delete result.rows[0].password;

    return result;
  }
  async validateUser(email: string, password: string) {
    const result = await pool.query(
      `
    SELECT id, name,email, password, role, created_at, updated_at
    FROM users
    WHERE email = $1
    `,
      [email],
    );

    if (result.rowCount === 0) {
      return null;
    }

    const user = result.rows[0];
    // console.log(user);
    const isMatched = await this.comparePassword(password, user.password);

    if (!isMatched) {
      return null;
    }

    delete user.password;

    return user as User;
  }
  async getUserById(reporterId: string) {
    const result = await pool.query(
      `
    SELECT id, name, email, role, created_at, updated_at
    FROM users
    WHERE id = $1
    `,
      [reporterId],
    );

    if (result.rowCount === 0) {
      return null;
    }

    return result.rows[0] as RUser & { id: string };
  }
}
export default new AuthService();
