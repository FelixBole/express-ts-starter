import express from 'express';
import { verifyJwt } from '../../lib/auth';
import { AuthenticationError } from '../../lib/errors';

export const authenticateRequest = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const { headers } = req;
        const hasAuthorization = Object.hasOwnProperty.call(
            headers,
            'authorization'
        );

        if (!hasAuthorization || req.headers.authorization === '')
            res.status(401).json({ error: 'Missing Token ' });

        // Check if token is set
        const { authorization } = req.headers;
        const [, accessToken] = authorization.split(' ');

        if (!accessToken) res.status(401).json({ error: 'Missing Token' });

        const userId = await verifyJwt(accessToken);

        if (!userId) res.status(401).json({ error: 'Invalid Token' });

        // Could also do additional verif by checking the userId inside the DB

        next();
    } catch (error) {
        if (error instanceof AuthenticationError) {
            res.status(401).json({ error: 'Invalid Token' });
        }
    }
};
