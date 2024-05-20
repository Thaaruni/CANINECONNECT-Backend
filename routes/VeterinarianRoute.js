import express from "express";
import { Veterinarian } from "../models/veterinarianModel.js";
import mongoose from "mongoose";

const router = express.Router();

// Route to get all veterinarians
router.get('/', async (request, response) => {
    try {
        // Fetch all veterinarians from the database
        const veterinarians = await Veterinarian.find();

        return response.status(200).send(veterinarians);

    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to create a new veterinarian
router.post('/', async (request, response) => {
    try {
        // Validate the request body fields
        const { name, specialization, experience, location, contact } = request.body;
        if (!name || !specialization || !experience || !location || !contact) {
            return response.status(400).send({ message: 'All fields are required.' });
        }

        // Create a new veterinarian object
        const newVeterinarian = {
            name,
            specialization,
            experience,
            location,
            contact,
        };

        // Create a new instance of the Veterinarian model and save it to the database
        const veterinarian = await Veterinarian.create(newVeterinarian);

        return response.status(201).send(veterinarian);

    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to update a veterinarian by ID
router.put('/:id', async (request, response) => {
    try {
        const veterinarianId = request.params.id;

        // Validate if the provided ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(veterinarianId)) {
            return response.status(400).send({ message: 'Invalid Veterinarian ID' });
        }

        // Find the veterinarian by ID and update the specified fields
        const updatedVeterinarian = await Veterinarian.findByIdAndUpdate(
            veterinarianId,
            request.body,
            { new: true } // Return the updated document
        );

        if (!updatedVeterinarian) {
            return response.status(404).send({ message: 'Veterinarian not found' });
        }

        return response.status(200).send(updatedVeterinarian);

    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to delete a veterinarian by ID
router.delete('/:id', async (request, response) => {
    try {
        const veterinarianId = request.params.id;

        // Validate if the provided ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(veterinarianId)) {
            return response.status(400).send({ message: 'Invalid Veterinarian ID' });
        }

        // Find the veterinarian by ID and delete it
        const deletedVeterinarian = await Veterinarian.findByIdAndDelete(veterinarianId);

        if (!deletedVeterinarian) {
            return response.status(404).send({ message: 'Veterinarian not found' });
        }

        return response.status(204).send();

    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
