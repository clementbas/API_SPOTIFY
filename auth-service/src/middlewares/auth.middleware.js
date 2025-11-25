import { verifyAccessToken } from '../utils/jwt.js';

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    const err = new Error('Token manquant');
    err.status = 401;
    return next(err);
  }

  try {
    const payload = verifyAccessToken(token);
    req.user = payload;
    return next();
  } catch (error) {
    const err = new Error('Token invalide ou expiré');
    err.status = 401;
    return next(err);
  }
};