import mongoose from "mongoose";

const veterinarianSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        specialization: {
            type: String,
            required: true
        },
        experience: {
            type: Number,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        contact: {
            type: String,
            required: true
        }
    }
);

export const Veterinarian = mongoose.model('Veterinarian', veterinarianSchema);
