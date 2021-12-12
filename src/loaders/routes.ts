import { Application, Router } from 'express';

import publicRoutes from '../routes/public';
import protectedRoutes from '../routes/protected';

export = (app: Application) => {
    publicRoutes.forEach((r: Router) => app.use(r));
    protectedRoutes.forEach((r: Router) => app.use(r));
};
