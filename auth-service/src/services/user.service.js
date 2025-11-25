import { userRepository } from '../repositories/user.repository.js';

export const userService = {
  getAllUsers: async () => {

    const users = await userRepository.findAll();
    return users;

  },

  deleteUser: async (id) => {
    return userRepository.delete(id);
  },

  updateUser: async (id, updates) => {
    return userRepository.update(id, updates);
  }
};