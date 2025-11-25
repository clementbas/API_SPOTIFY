export const errorHandler = (err, req, res, next) => {
  const env = process.env.NODE_ENV || 'development';

  // Status HTTP
  const status = err.status || 500;

  // Message visible côté client
  const message =
    err.message || 'Une erreur interne est survenue sur le serveur';

  // Code interne (optionnel)
  const code = err.code || null;

  const response = {
    success: false,
    error: {
      message,
      status,
      code,
      path: req.originalUrl,
      method: req.method,
      timestamp: new Date().toISOString(),
    },
  };

  // En dev : on inclut la stack
  if (env === 'development') {
    response.error.stack = err.stack;
    console.error('🔴 ERROR STACK :', err);
  }

  return res.status(status).json(response);
};
