import express from 'express';
import cors from 'cors';

import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';

import { errorHandler } from './middlewares/error.middleware.js';

export const createApp = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use('/api/auth', authRouter);
    app.use('/api/auth', userRouter);

    app.use(errorHandler);

    return app;
}