import express from 'express';
import cors from 'cors';

import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';

import { errorHandler } from './middlewares/error.middleware.js';
import { authMiddleware } from './middlewares/auth.middleware.js';

export const createApp = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use('/api/auth', authRouter);

    app.use('/api', authMiddleware);
    app.use('/api/users', userRouter);

    app.use(errorHandler);

    return app;
}