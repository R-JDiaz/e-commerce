import BaseModel from "../../common/model/orm/base.js";

export default class UserModel extends BaseModel {
  static table = "users";

  static publicFields = [
    "id",
    "first_name",
    "last_name",
    "email",
    "role",
    "created_at"
  ];
}