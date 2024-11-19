import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const router = express.Router();

router.post('/signup', async (req, res, next) => {
    try {
        const { name, email, password, dob, role } = req.body;
        if (!name || !email || !password || !dob || !role) {
            res.status(400).send('Wrong Or Incomplete Information Provided');
        }
        if (!['patient', 'doctor'].includes(role)) {
            res.status(400).send(
                "Invalid role provided. Allowed roles are 'patient', 'doctor'"
            );
        }

        const user = new User({
            name,
            email,
            password,
            role,
            dob,
        });

        user.save()
            .then((savedUser) => {
                console.log(savedUser);
                res.send(savedUser);
            })
            .catch((error) => {
                console.log(error);
                if (error['code'] == 11000) {
                    res.status(400).json({
                        message: 'Value already exists in DB',
                        // @ts-ignore
                        value: error['keyValue'],
                    });
                }
            });
    } catch (error) {
        next(error);
    }
});

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
        res.status(401).send('Email or Password does not exists');
    }
    console.log(user);

    //TODO type cast user model
    // @ts-ignore
    const token = jwt.sign(
        {
            // @ts-ignore
            name: user.name,
            // @ts-ignore
            email: user.email,
            // @ts-ignore
            role: user.role,
        },
        //TODO put secret in env
        'secret',
        { expiresIn: '1d' }
    );

    res.json({
        loggedIn: true,
        token,
    });
});

export default router;
