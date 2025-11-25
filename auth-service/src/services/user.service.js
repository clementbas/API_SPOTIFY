import { userRepository } from '../repositories/user.repository.js';

export const userService = {

  async getAllUsers() {
    try {
      return await userRepository.findAll();
    } catch (error) {
      throw new Error(`UserService.getAllUsers: ${error.message}`);
    }
  },

  async getUserById(id) {
    try {
      const user = await userRepository.findById(id);

      if (!user) {
        const err = new Error('User not found');
        err.status = 404;
        throw err;
      }

      return user;

    } catch (error) {
      throw new Error(`UserService.getUserById: ${error.message}`);
    }
  },

  async updateUser(id, updates) {
    try {
      const existingUser = await userRepository.findById(id);

      if (!existingUser) {
        const err = new Error('User not found');
        err.status = 404;
        throw err;
      }

      const updatedUser = await userRepository.update(id, updates);
      return updatedUser;

    } catch (error) {
      throw new Error(`UserService.updateUser: ${error.message}`);
    }
  },

  async deleteUser(id) {
    try {
      const exists = await userRepository.findById(id);

      if (!exists) {
        const err = new Error('User not found');
        err.status = 404;
        throw err;
      }

      const deleted = await userRepository.delete(id);
      return { success: deleted };

    } catch (error) {
      throw new Error(`UserService.deleteUser: ${error.message}`);
    }
  },

  async createUser({ username, email, password }) {
    try {
      const existingEmail = await userRepository.findByEmail(email);
      if (existingEmail) {
        const err = new Error('Email already in use');
        err.status = 400;
        throw err;
      }

      const existingUsername = await userRepository.findByUsername(username);
      if (existingUsername) {
        const err = new Error('Username already in use');
        err.status = 400;
        throw err;
      }

      const newUser = await userRepository.create({ username, email, password });

      return newUser;

    } catch (error) {
      throw new Error(`UserService.createUser: ${error.message}`);
    }
  }
};
