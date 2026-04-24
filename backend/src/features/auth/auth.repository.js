import UserModel from "../user/user.repository.js";
import RefreshTokenModel from "./auth.model.js";

export default class AuthRepository {
  static async findUserByEmail(email, db = null) {
    const conn = db ?? UserModel.pool;

    const [rows] = await conn.query(
      `SELECT * FROM users WHERE email = ? LIMIT 1`,
      [email]
    );

    return rows[0];
  }

  static async findUserById(id, db = null) {
    const conn = db ?? UserModel.pool;

    const [rows] = await conn.query(
      `SELECT * FROM users WHERE id = ? LIMIT 1`,
      [id]
    );

    return rows[0];
  }

  static async createUser(data, db = null) {
    return UserModel.create(data, db);
  }

  static async createRefreshToken(data, db = null) {
    return RefreshTokenModel.create(data, db);
  }

  static async findRefreshTokenByHash(tokenHash, db = null) {
    return RefreshTokenModel.findActiveByHash(tokenHash, db);
  }

  static async revokeRefreshTokenByHash(tokenHash, db = null) {
    return RefreshTokenModel.revokeByHash(tokenHash, db);
  }

  static async revokeRefreshTokensByUserId(userId, db = null) {
    return RefreshTokenModel.revokeByUserId(userId, db);
  }
}
