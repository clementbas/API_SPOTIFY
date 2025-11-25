import { authService } from '../services/auth.service.js';

export const authController = {
  async register(req, res, next) {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'username, email and password are required',
        });
      }

      const result = await authService.register({ username, email, password });

      return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          user: {
            id: result.user.id,
            username: result.user.username,
            email: result.user.email,
          },
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  async login(req, res, next) {
    try {
      const { identifier, password } = req.body;

      if (!identifier || !password) {
        return res.status(400).json({
          success: false,
          message: 'identifier and password are required',
        });
      }

      const result = await authService.login({ identifier, password });

      return res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        data: {
          user: {
            id: result.user.id,
            username: result.user.username,
            email: result.user.email,
          },
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
        },
      });
    } catch (err) {
      next(err);
    }
  },
};