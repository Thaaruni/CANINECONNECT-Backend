import express from "express";
import { Vehicle } from "../models/vehicleModel.js";
import mongoose from "mongoose";
import multer from "multer"    // import multer

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/vehicles'); // Save uploaded files to the 'uploads' directory
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Set the file name to be the current timestamp + original file name
    }
  });
  const upload = multer({ storage: storage });
  const uploadImage = upload.single('image');


const router = express.Router();



router.get('/', async (request, response) => {
    try {
        // Fetch all dogs from the database
        const vehicles = await Vehicle.find();

        return response.status(200).send(vehicles);

    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.post('/', uploadImage, async (request, response) => {
    try {
      // Validate the request body fields
      const { username,location, contact, email, vehiclename,model } = request.body;
  
      if (!username ||!location|| !contact || !email || !vehiclename || !model) {
        return response.status(400).send({ message: 'All fields are required.' });
      }
  
      // Get the path to the uploaded image file
      const imagePath = request.file.path;
  
      // Create a new dog object with image URL
      const newVehicle = {
        username,
        location,
        contact,
        email,
       
        vehiclename,
        model,
        image : imagePath // Save the path to the uploaded image file
      };
  
      // Create a new instance of the Dog model and save it to the database
      const vehicle = await Vehicle.create(newVehicle);
  
      return response.status(201).send(vehicle);
  
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });


router.put('/:id', async (request, response) => {
    try {
        const vehicleId = request.params.id;

        // Validate if the provided ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
            return response.status(400).send({ message: 'Invalid Vehicle ID' });
        }

        const { username,location,  contact,email, vehiclename,model, image } = request.body;

        // Validate if at least one field is provided for updating
        if (!username && !location && !email && !contact && !vehiclename && !model && !image) {
            return response.status(400).send({ message: 'At least one field is required for updating.' });
        }

        // Find the vehicle by ID and update the specified fields
        const updatedVehicle = await Vehicle.findByIdAndUpdate(
            vehicleId,
            { username,location,  contact,email,vehiclename,model, image },
            { new: true } // Return the updated document
        );

        if (!updatedVehicle) {
            return response.status(404).send({ message: 'Vehicle not found' });
        }

        return response.status(200).send(updatedVehicle);

    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.delete('/:id', async (request, response) => {
    try {
        const vehicleId = request.params.id;

        // Validate if the provided ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
            return response.status(400).send({ message: 'Invalid Vehicle ID' });
        }

        // Find the dog by ID and delete it
        const deletedVehicle = await Vehicle.findByIdAndDelete(vehicleId);

        if (!deletedVehicle) {
            return  response.status(404).send({ message: 'Vehicle not found' });
        }

        return response.status(204).send();

    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;