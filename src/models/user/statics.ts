import { Schema } from 'mongoose';

export function statics(userSchema: Schema) {
    userSchema.statics.test = function test() {
        return 'Statics test';
    };
}
