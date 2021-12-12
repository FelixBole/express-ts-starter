import mongoose from 'mongoose';

import { methods } from './methods';
import { hooks } from './hooks';
import { statics } from './statics';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

hooks(userSchema);
methods(userSchema);
statics(userSchema);

export const User = mongoose.model('User', userSchema);
