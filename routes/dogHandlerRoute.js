import express from "express";
import { DogHandler } from "../models/dogHandlerModel.js";
import mongoose from "mongoose";
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/handlers/'); // Save uploaded files to the 'uploads' directory
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
        // Fetch all dog handlers from the database
        const dogHandlers = await DogHandler.find();

        return response.status(200).send(dogHandlers);

    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.post('/', uploadImage, async (request, response) => {
    try {
        // Validate the request body fields
        const { username, email, gender, telNo, address, experiences } = request.body;

        if (!username || !email || !gender || !telNo || !address || !experiences) {
            return response.status(400).send({ message: 'All fields are required.' });
        }

        // Get the path to the uploaded image file
        const imagePath = request.file.path;

        // Create a new dog handler object with image URL
        const newDogHandler = {
            username,
            email,
            gender,
            telNo,
            address,
            experiences,
            image: imagePath, // Save the path to the uploaded image file
            certificateImage,
        };

        // Create a new instance of the DogHandler model and save it to the database
        const dogHandler = await DogHandler.create(newDogHandler);

        return response.status(201).send(dogHandler);

    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.put('/:id', async (request, response) => {
    try {
        const dogHandlerId = request.params.id;

        // Validate if the provided ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(dogHandlerId)) {
            return response.status(400).send({ message: 'Invalid Dog Handler ID' });
        }

        const { username, email, gender, telNo, address, experiences, image } = request.body;

        // Validate if at least one field is provided for updating
        if (!username && !email && !gender && !telNo && !address && !experiences && !image) {
            return response.status(400).send({ message: 'At least one field is required for updating.' });
        }

        // Find the dog handler by ID and update the specified fields
        const updatedDogHandler = await DogHandler.findByIdAndUpdate(
            dogHandlerId,
            { username, email, gender, telNo, address, experiences, image },
            { new: true } // Return the updated document
        );

        if (!updatedDogHandler) {
            return response.status(404).send({ message: 'Dog Handler not found' });
        }

        return response.status(200).send(updatedDogHandler);

    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.delete('/:id', async (request, response) => {
    try {
        const dogHandlerId = request.params.id;

        // Validate if the provided ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(dogHandlerId)) {
            return response.status(400).send({ message: 'Invalid Dog Handler ID' });
        }

        // Find the dog handler by ID and delete it
        const deletedDogHandler = await DogHandler.findByIdAndDelete(dogHandlerId);

        if (!deletedDogHandler) {
            return response.status(404).send({ message: 'Dog Handler not found' });
        }

        return response.status(204).send();

    } catch (error) {
        console.error(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;



// import express from "express";
// import { DogHandler } from "../models/dogHandlerModel.js";
// import mongoose from "mongoose";

// const router = express.Router();

// router.get('/', async (request, response) => {
//     try {
//         // Fetch all dog handlers from the database
//         const dogHandlers = await DogHandler.find();
//         return response.status(200).send(dogHandlers);
//     } catch (error) {
//         console.error(error.message);
//         response.status(500).send({ message: error.message });
//     }
// });

// router.post('/', async (request, response) => {
//     try {
//         // Validate the request body fields
//         const { name, age, experience, location} = request.body;
//         if (!name || !age || !experience || !location) {
//             return response.status(400).send({ message: 'All fields are required.' });
//         }
//         // Create a new dog handler object
//         const newDogHandler = {
//             name,
//             age,
//             experience,
//             location,
            
//         };
//         // Create a new instance of the DogHandler model and save it to the database
//         const dogHandler = await DogHandler.create(newDogHandler);
//         return response.status(201).send(dogHandler);
//     } catch (error) {
//         console.log(error.message);
//         response.status(500).send({ message: error.message });
//     }
// });

// router.put('/:id', async (request, response) => {
//     try {
//         const dogHandlerId = request.params.id;
//         // Validate if the provided ID is a valid ObjectId
//         if (!mongoose.Types.ObjectId.isValid(dogHandlerId)) {
//             return response.status(400).send({ message: 'Invalid Dog Handler ID' });
//         }
//         const { name, age, experience, location } = request.body;
//         // Validate if at least one field is provided for updating
//         if (!name && !age && !experience && !location ) {
//             return response.status(400).send({ message: 'At least one field is required for updating.' });
//         }
//         // Find the dog handler by ID and update the specified fields
//         const updatedDogHandler = await DogHandler.findByIdAndUpdate(
//             dogHandlerId,
//             { name, age, experience, location },
//             { new: true } // Return the updated document
//         );
//         if (!updatedDogHandler) {
//             return response.status(404).send({ message: 'Dog Handler not found' });
//         }
//         return response.status(200).send(updatedDogHandler);
//     } catch (error) {
//         console.error(error.message);
//         response.status(500).send({ message: error.message });
//     }
// });

// router.delete('/:id', async (request, response) => {
//     try {
//         const dogHandlerId = request.params.id;
//         // Validate if the provided ID is a valid ObjectId
//         if (!mongoose.Types.ObjectId.isValid(dogHandlerId)) {
//             return response.status(400).send({ message: 'Invalid Dog Handler ID' });
//         }
//         // Find the dog handler by ID and delete it
//         const deletedDogHandler = await DogHandler.findByIdAndDelete(dogHandlerId);
//         if (!deletedDogHandler) {
//             return response.status(404).send({ message: 'Dog Handler not found' });
//         }
//         return response.status(204).send();
//     } catch (error) {
//         console.error(error.message);
//         response.status(500).send({ message: error.message });
//     }
// });

// export default router;
