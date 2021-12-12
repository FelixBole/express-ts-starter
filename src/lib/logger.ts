import winston from 'winston';
import 'winston-mongodb';
import fs from 'fs';
import path from 'path';
import config from '../config';

if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
}

const transports = [];

const databaseTransport = new winston.transports.MongoDB({
    level: 'error',
    db: config.mongoUri,
    options: {
        useUnifiedTopology: true,
    },
    collection: 'server_logs',
});

const fileTransport = new winston.transports.File({
    filename: path.join('logs', '/logs.txt'),
});

if (process.env.NODE_ENV !== 'development') {
    transports.push(
        new winston.transports.Console(),
        fileTransport,
        databaseTransport
    );
} else {
    transports.push(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.cli(),
                winston.format.splat()
            ),
        }),
        fileTransport,
        databaseTransport
    );
}

export const Logger = winston.createLogger({
    level: config.logs.level,
    levels: winston.config.npm.levels,
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
    ),
    transports,
});
