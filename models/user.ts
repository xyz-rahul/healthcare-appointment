import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
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
