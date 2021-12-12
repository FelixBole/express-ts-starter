import express from 'express';
import { User } from '../../models/user';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        return res.status(200).json({ goodCall: true });
    } catch (error) {
        next(error);
    }
});

// For mocha tests
router.post('/', async (req, res, next) => {
    try {
        const user = new User();
        user.name = 'Felix';
        (user.email = 'felix.bole@visionspol.eu'), (user.password = 'lechat');
        await user.save();

        return res.json({ message: 'OK' });
    } catch (error) {
        next(error);
    }
});

export default router;
