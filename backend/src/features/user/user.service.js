import UserModel from "./user.repository.js";

export const getAllUsers = async () => {
  return await UserModel.findAllSafe();
};

export const getUser = async (id) => {
  const user = await UserModel.findByIdSafe(id);

  if (!user) throw new Error("User not found");

  return user;
};

export const updateUser = async (id, data) => {
  const updatedUser = await UserModel.update(id, data);

  if (!updatedUser) throw new Error("User not found");

  return updatedUser;
};

export const deleteUser = async (id) => {
  const result = await UserModel.delete(id);
  return result;
};