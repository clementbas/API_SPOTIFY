import Joi from 'joi';
import { userService } from '../services/user.service.js';

export const userController = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.getAllUsers();
            return res.status(200).json({ users });
        } catch (err) {
            next(err);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { id } = req.params;
            await userService.deleteUser(id);
            return res.status(200).json({ message: 'User deleted successfully' });
        } catch (err) {
            next(err);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { id } = req.params;
            const updates = req.body;
            await userService.updateUser(id, updates);
            return res.status(200).json({ message: 'User updated successfully' });
        } catch (err) {
            next(err);
        }
    }
};