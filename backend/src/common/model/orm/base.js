import { getPool } from "../../../core/config/pool.js";
import { getSafe } from "../../utilities/sanitizer.js";

export default class BaseModel {
  static table = "";
  static publicFields = [];

  static get pool() {
    return getPool();
  }

  static async findById(id) {
    const [rows] = await this.pool.query(
      `SELECT * FROM ${this.table} WHERE id = ? LIMIT 1`,
      [id]
    );
    return rows[0] || null;
  }

  static async findByIdSafe(id) {
    const data = await this.findById(id);
    return getSafe(data, this.publicFields);
  }

  static async findAll() {
    const [rows] = await this.pool.query(
      `SELECT * FROM ${this.table}`
    );
    return rows;
  }

  static async findAllSafe() {
    const data = await this.findAll();
    return getSafe(data, this.publicFields);
  }

  static async create(data) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const [result] = await this.pool.query(
      `INSERT INTO ${this.table} (${keys.join(",")})
       VALUES (${keys.map(() => "?").join(",")})`,
      values
    );

    return this.findById(result.insertId);
  }

  static async update(id, data) {
    const keys = Object.keys(data);

    if (keys.length === 0) throw new Error("No fields provided");

    const values = Object.values(data);
    const setClause = keys.map(k => `${k} = ?`).join(", ");

    const [result] = await this.pool.query(
      `UPDATE ${this.table} SET ${setClause} WHERE id = ?`,
      [...values, id]
    );

    if (result.affectedRows === 0) return null;

    return this.findByIdSafe(id);
  }

  static async delete(id) {
    const [result] = await this.pool.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return result.affectedRows > 0;
  }
}