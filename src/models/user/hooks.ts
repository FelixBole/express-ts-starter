import { Schema } from 'mongoose';
import { hashPassword } from '../../lib/auth';

export function hooks(userSchema: Schema) {
    userSchema.pre('save', async function preSave(next) {
        const user = this;
        const { password, name } = user;
        const hashedPassword = await hashPassword(password);
    });
}
