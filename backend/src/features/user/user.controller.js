import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "./user.service.js";


export const getUsersController = async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
};

export const getUserController = async (req, res) => {
  try {
    const user = await getUser(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updateUserController = async (req, res) => {
  const user = await updateUser(req.params.id, req.body);
  res.json(user);
};

export const deleteUserController = async (req, res) => {
  await deleteUser(req.params.id);
  res.json({ message: "User deleted successfully" });
};