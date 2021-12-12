import {
    Application,
    Request,
    Response,
    NextFunction,
    json as expressJson,
} from 'express';
import cors from 'cors';

import routes from './routes';
import { NotFoundError } from '../lib/errors';

export async function expressLoader(app: Application) {
    /**
     * Health Check endpoints
     */
    app.get('/status', (req, res) => {
        res.status(200).end();
    });
    app.head('/status', (req, res) => {
        res.status(200).end();
    });

    app.enable('trust proxy');
    app.use(cors());
    app.use(expressJson());
    routes(app);

    app.use((req, res, next) => {
        const err = new NotFoundError('Not Found', 404);
        next(err);
    });

    /// error handlers
    app.use(
        (
            err: NotFoundError,
            req: Request,
            res: Response,
            next: NextFunction
        ) => {
            /**
             * Handle 401 thrown by express-jwt library
             */
            if (err.name === 'UnauthorizedError') {
                return res
                    .status(err.status)
                    .send({ message: err.message })
                    .end();
            }
            return next(err);
        }
    );
    app.use(
        (
            err: NotFoundError,
            req: Request,
            res: Response,
            next: NextFunction
        ) => {
            res.status(err.status || 500);
            res.json({
                errors: {
                    message: err.message,
                },
            });
        }
    );
}
