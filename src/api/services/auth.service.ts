import bcrypt from "bcrypt";
import type { RUser } from "../../types";
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
}
export default new AuthService();
