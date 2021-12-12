import { Schema } from 'mongoose';
import { compareHash } from '../../lib/auth';

export function methods(userSchema: Schema) {
    userSchema.methods.comparePassword = function comparePassword(str: string) {
        const hash = this.get('password');
        return compareHash(str, hash);
    };
}
