import { User } from '../models/user.model.js';

export const userRepository = {

  async findById(id) {
    try {
      return await User.findByPk(id);
    } catch (error) {
      throw new Error(`UserRepository.findById: ${error.message}`);
    }
  },

  async findByEmail(email) {
    try {
      return await User.findOne({ where: { email } });
    } catch (error) {
      throw new Error(`UserRepository.findByEmail: ${error.message}`);
    }
  },

  async findByUsername(username) {
    try {
      return await User.findOne({ where: { username } });
    } catch (error) {
      throw new Error(`UserRepository.findByUsername: ${error.message}`);
    }
  },

  async findAll() {
    try {
      return await User.findAll();
    } catch (error) {
      throw new Error(`UserRepository.findAll: ${error.message}`);
    }
  },

  async create({ username, email, password }) {
    try {
      return await User.create({ username, email, password });
    } catch (error) {
      throw new Error(`UserRepository.create: ${error.message}`);
    }
  },

  async update(id, updates) {
    try {
      const [affectedRows] = await User.update(updates, { where: { id } });

      if (affectedRows === 0) return null;

      // On récupère l'entité mise à jour (standard en architecture couchée)
      return await User.findByPk(id);

    } catch (error) {
      throw new Error(`UserRepository.update: ${error.message}`);
    }
  },

  async delete(id) {
    try {
      const deleted = await User.destroy({ where: { id } });
      return deleted > 0;  // booléen plus propre
    } catch (error) {
      throw new Error(`UserRepository.delete: ${error.message}`);
    }
  }
};
