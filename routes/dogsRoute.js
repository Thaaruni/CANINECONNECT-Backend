import express from "express";
import { Dog } from "../models/dogModel.js";
import mongoose from "mongoose";
import multer from "multer"    // import multer

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Save uploaded files to the 'uploads' directory
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
        const dogs = await Dog.find();

        return response.status(200).send(dogs);

    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

// router.post('/',async(request,response)=>{
    
//     try {
//         // Validate the request body fields
//         const { name, age, breed, location, gender } = request.body;

//         if (!name ||!age || !breed || !location || !gender) {
//             return response.status(400).send({ message: 'All fields are required.' });
//         }

//         // Create a new dog object
//         const newDog = {
//             name,
//             age,
//             breed,
//             location,
//             gender,
//         };

//         // Create a new instance of the Dog model and save it to the database
//         const dog = await Dog.create(newDog);

//         return response.status(201).send(dog);
        
//     } catch (error) {
//         console.l.og(error.message);
//         response.status(500).send({message : error.message});
//     }
// });

router.post('/', uploadImage, async (request, response) => {
    try {
      // Validate the request body fields
      const { name, age, breed, location, gender } = request.body;
  
      if (!name || !age || !breed || !location || !gender) {
        return response.status(400).send({ message: 'All fields are required.' });
      }
  
      // Get the path to the uploaded image file
      const imagePath = request.file.path;
  
      // Create a new dog object with image URL
      const newDog = {
        name,
        age,
        breed,
        location,
        gender,
        image: imagePath // Save the path to the uploaded image file
      };
  
      // Create a new instance of the Dog model and save it to the database
      const dog = await Dog.create(newDog);
  
      return response.status(201).send(dog);
  
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });


router.put('/:id', async (request, response) => {
    try {
        const dogId = request.params.id;

        // Validate if the provided ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(dogId)) {
            return response.status(400).send({ message: 'Invalid Dog ID' });
        }

        const { name, age, breed, image, location, gender } = request.body;

        // Validate if at least one field is provided for updating
        if (!name && !image && !location && !gender) {
            return response.status(400).send({ message: 'At least one field is required for updating.' });
        }

        // Find the dog by ID and update the specified fields
        const updatedDog = await Dog.findByIdAndUpdate(
            dogId,
            { name, age, breed, image, location, gender },
            { new: true } // Return the updated document
        );

        if (!updatedDog) {
            return response.status(404).send({ message: 'Dog not found' });
        }

        return response.status(200).send(updatedDog);

    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.delete('/:id', async (request, response) => {
    try {
        const dogId = request.params.id;

        // Validate if the provided ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(dogId)) {
            return response.status(400).send({ message: 'Invalid Dog ID' });
        }

        // Find the dog by ID and delete it
        const deletedDog = await Dog.findByIdAndDelete(dogId);

        if (!deletedDog) {
            return  response.status(404).send({ message: 'Dog not found' });
        }

        return response.status(204).send();

    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;