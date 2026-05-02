import BaseModel from "../../common/model/orm/base.js";

export default class NotificationModel extends BaseModel {
  static table = "notifications";

  static publicFields = [
    "id",
    "user_id",
    "type",
    "message",
    "is_read",
    "created_at"
  ];

  static async findByUserId(userId, db = null) {
    const conn = db ?? this.pool;

    const [rows] = await conn.query(
      `
      SELECT ${this.publicFields.join(", ")}
      FROM ${this.table}
      WHERE user_id = ?
      ORDER BY created_at DESC
      `,
      [userId]
    );

    return rows;
  }

  static async markAsRead(id, db = null) {
    const conn = db ?? this.pool;

    const [result] = await conn.query(
      `UPDATE ${this.table} SET is_read = TRUE WHERE id = ?`,
      [id]
    );

    if (result.affectedRows === 0) return null;

    return this.findById(id, conn);
  }
}