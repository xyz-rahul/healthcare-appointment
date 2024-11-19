import mongoose from 'mongoose';

export interface IUser {
    name: string;
    dob: Date;
    email: string;
    password: string;
    role: 'patient' | 'doctor' | 'admin';
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new mongoose.Schema<IUser>(
    {
        name: {
            type: String,
            require: true,
        },
        dob: {
            type: Date,
            require: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            require: true,
        },
        role: {
            type: String,
            enum: ['patient', 'doctor', 'admin'],
            require: true,
        },
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
