import express from 'express';
import Doctor from '../models/doctor';
import User from '../models/user';
const router = express.Router();

function validateDoctor(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    const { consultationFee, specialty, availableDays, timeslot, userId } =
        req.body;

    if (
        !consultationFee ||
        !specialty ||
        !availableDays ||
        !timeslot ||
        !userId
    ) {
        res.status(400).json({
            message:
                'All fields (consultationFee, specialty, availableDays, timeslot, user) are required.',
        });
    }

    if (!Array.isArray(availableDays) || availableDays.length === 0) {
        res.status(400).json({
            message: 'availableDays must be a non-empty array.',
        });
    }
    next();
}

router.get('/', async (req, res, next) => {
    try {
        // Retrieve all doctors and populate the 'user' field
        const doctors = await Doctor.find();

        res.status(200).json(doctors);
    } catch (error) {
        next(error);
    }
});

router.post('/add', validateDoctor, async (req, res, next) => {
    try {
        const { consultationFee, specialty, availableDays, timeslot, userId } =
            req.body;

        const user = await User.findById(userId);
        console.log(user);
        if (!user) res.status(400).send('User not found');
        else {
            const doctor = new Doctor({
                consultationFee,
                specialty,
                availableDays,
                timeslot,
                user,
            });

            const savedDoctor = new Doctor({
                consultationFee,
                specialty,
                availableDays,
                timeslot,
                user,
            });
            res.send(savedDoctor);
        }
    } catch (error) {
        next(error);
    }
});

router.get('/:doctorId', async (req, res, next) => {
    try {
        const { doctorId } = req.params;
        const doctor = await Doctor.findById(doctorId);

        if (!doctor) {
            res.status(404).json({ message: 'Doctor not found.' });
        } else {
            res.status(200).json(doctor);
        }
    } catch (error) {
        next(error);
    }
});

export default router;
