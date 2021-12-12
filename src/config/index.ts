import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const foundEnv = dotenv.config();
if (foundEnv.error) {
    throw new Error('Could not find .env file');
}

export = {
    port: parseInt(process.env.PORT, 10),
    mongoUri: process.env.MONGO_URI,
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },
    api: {
        prefix: '/api',
    },
    jwtSecret: process.env.JWT_SECRET,
    jwtAlgorithm: process.env.JWT_ALGO,

    /**
     * Hashing
     */
    salt: parseInt(process.env.SALT, 10) || 2,

    /**
     * This company
     */
    company: process.env.COMPANY || 'Slax',
};
