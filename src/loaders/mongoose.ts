import mongoose from 'mongoose';
import config from '../config';

export async function mongooseLoader() {
    const connection = await mongoose.connect(config.mongoUri);
    return connection;
}
