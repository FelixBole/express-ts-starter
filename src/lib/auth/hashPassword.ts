import bcrypt from 'bcrypt';

import config from '../../config';
import { HashError } from '../errors';

export async function hashPassword(str: string) {
    try {
        const salt = await bcrypt.genSalt(config.salt);
        const hash = await bcrypt.hash(str, salt);
        return hash;
    } catch (error) {
        throw new HashError(error.message);
    }
}
