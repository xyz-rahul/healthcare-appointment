import mongoose from 'mongoose';
import User from '../models/user';
import { error } from 'console';

export default function () {
    mongoose
        .connect('mongodb://127.0.0.1:27017/develop')
        .then(() => console.log('MongoDB Connected!'));
    User.collection
        .drop()
        .then((res) => console.log(`user collection dropped`, res))
        .catch((error) => {
            console.log('user collectiond drop error', error);
        });
}
