import express, { Express } from 'express';
import userRoutes from '../routes/user';
import doctorRoutes from '../routes/doctor';

export default function (app: Express) {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use('/api/user', userRoutes);
    app.use('/api/doctor', doctorRoutes);

    app.get('/hello-world', async (req, res) => {
        res.send('req received');
    });
}
