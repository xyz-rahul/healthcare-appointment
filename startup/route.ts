import express, { Express } from 'express';
import userRoutes from '../routes/user';

export default function (app: Express) {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use('/api/user', userRoutes);

    app.get('/hello-world', async (req, res) => {
        res.send('req received');
    });
}
