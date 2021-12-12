import bcrypt from 'bcrypt';
import { promisify } from 'util';
import { AuthenticationError } from '../errors';

const asyncCompare = promisify(bcrypt.compare);

export async function compareHash(str: string | Buffer, hash: string) {
    try {
        const result = await asyncCompare(str, hash);
        return result;
    } catch (error) {
        throw new AuthenticationError(error.message);
    }
}
