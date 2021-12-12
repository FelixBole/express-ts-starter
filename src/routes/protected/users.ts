import express from 'express';
import { Logger } from '../../lib/logger';

const router = express.Router();

router.get('/users', async (req, res, next) => {
    try {
        Logger.info('Hello from users protected route');
    } catch (error) {
        next(error);
    }
});

export default router;
