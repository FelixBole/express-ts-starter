import { expressLoader } from './express';
import { mongooseLoader } from './mongoose';
import { Logger } from '../lib/logger';
// import models from '../models';
import { Application } from 'express';

export default function loadResources(app: Application) {
    mongooseLoader();
    Logger.info('DB loaded and connected !');

    expressLoader(app);
    Logger.info('Express loaded !');
}
