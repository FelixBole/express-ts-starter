import jwt from 'jsonwebtoken';
import { AuthenticationError } from '../errors';
import config from '../../config';
import { promisify } from 'util';

const asyncJwtSign = promisify(jwt.sign);

function asyncJwtVerify(token: string, secret: string) {
    return new Promise((resolve, reject) => {
        const result = jwt.verify(token, secret);
        if (result) {
            resolve(result);
        } else {
            reject('Could not verify token');
        }
    });
}

export async function verifyJwt(token: string) {
    try {
        const result = await asyncJwtVerify(token, config.jwtSecret);
        return result;
    } catch (error) {
        throw new AuthenticationError(`Authentication error: ${error.message}`);
    }
}

export async function generateToken(payload: any = {}) {
    try {
        const { userId } = payload;
        const token = await asyncJwtSign(
            {
                data: { userId },
                exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
                issuer: config.company,
            },
            config.jwtSecret
        );

        return token;
    } catch (error) {
        throw new AuthenticationError(
            `Token could not be generated: ${error.message}`
        );
    }
}

export async function generateServiceToken(payload: any = {}) {
    try {
        const { CLIENT_ID, CLIENT_SECRET } = payload;
        const token = await asyncJwtSign(
            {
                data: { CLIENT_ID, CLIENT_SECRET },
                exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
                issuer: config.company,
            },
            config.jwtSecret
        );
        return token;
    } catch (error) {
        throw new AuthenticationError(
            `Token could not be generated: ${error.message}`
        );
    }
}
