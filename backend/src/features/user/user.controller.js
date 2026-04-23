import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "./user.service.js";
import { asyncHandler } from "../../common/utilities/handler.js";


export const getUsersController = asyncHandler(async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
});

export const getUserController = asyncHandler(async (req, res) => {
  const user = await getUser(req.params.id);
  res.json(user);
});

export const updateUserController = asyncHandler(async (req, res) => {
  const user = await updateUser(req.params.id, req.body);
  res.json(user);
});

export const deleteUserController = asyncHandler(async (req, res) => {
  await deleteUser(req.params.id);
  res.json({ message: "User deleted successfully" });
});
