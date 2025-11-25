import { User } from '../models/user.model.js';

export const userRepository = {
  findByEmail: async (email) => {
    return User.findOne({ where: { email } });
  },

  findByUsername: async (username) => {
    return User.findOne({ where: { username } });
  },

  findAll: async () => {
    return User.findAll();
  },

  create: async ({ username, email, password }) => {
    return User.create({ username, email, password });
  },

  delete: async (id) => {
    return User.destroy({ where: { id } });
  },

  update: async (id, updates) => {
    return User.update(updates, { where: { id } });
  }
};