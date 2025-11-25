import { userService } from '../services/user.service.js';

export const userController = {

  async getAllUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.status(200).json({
        success: true,
        data: users
      });
    } catch (err) {
      next(err);
    }
  },

  async getUserById(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ success: false, message: "User ID is required" });
      }

      const user = await userService.getUserById(id);

      return res.status(200).json({
        success: true,
        data: user
      });

    } catch (err) {
      next(err);
    }
  },

  async createUser(req, res, next) {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "username, email and password are required"
        });
      }

      const createdUser = await userService.createUser({ username, email, password });

      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: createdUser
      });

    } catch (err) {
      next(err);
    }
  },

  async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const updates = req.body;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "User ID is required"
        });
      }

      const updatedUser = await userService.updateUser(id, updates);

      return res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: updatedUser
      });

    } catch (err) {
      next(err);
    }
  },

  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "User ID is required"
        });
      }

      await userService.deleteUser(id);

      return res.status(200).json({
        success: true,
        message: "User deleted successfully"
      });

    } catch (err) {
      next(err);
    }
  }
};
