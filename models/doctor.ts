import { ObjectId } from 'mongoose';
import mongoose from 'mongoose';

export interface IDoctor {
    consultationFee: number;
    specialty: string;
    availableDays: string[];
    timeslot: {
        start: string;
        end: string;
    };
    user: ObjectId;
}

const doctorSchema = new mongoose.Schema<IDoctor>({
    consultationFee: {
        type: Number,
        required: true,
    },
    specialty: {
        type: String,
        required: true,
    },
    availableDays: {
        type: [String],
        required: true,
    },
    timeslot: {
        start: {
            type: String,
            required: true,
        },
        end: {
            type: String,
            required: true,
        },
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
