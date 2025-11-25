import { authService } from '../services/auth.service.js';
import jwt from 'jsonwebtoken';

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

  async verifyToken(req, res, next) {
    try {
      const authHeader = req.headers.authorization || '';

      if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token manquant ou invalide.' });
      }

      const token = authHeader.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      return res.json({
        valid: true,
        user: {
          id: decoded.id,
          email: decoded.email,
          username: decoded.username,
        },
      });
    } catch (error) {
      console.error('Erreur verify token :', error.message);
      return res.status(401).json({ valid: false, message: 'Token invalide ou expiré.' });
    }
  },
};