// import express from "express";
// import { signIn } from "../models/signInModel.js";
// import mongoose from "mongoose";
// import multer from "multer"    // import multer

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/'); // Save uploaded files to the 'uploads' directory
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + '-' + file.originalname); // Set the file name to be the current timestamp + original file name
//     }
//   });
//   const upload = multer({ storage: storage });
//   const uploadImage = upload.single('image'); 


// const router = express.Router();



// router.get('/', async (request, response) => {
//     try {
//         // Fetch all dogs from the database
//         const signIn = await signIn.find();

//         return response.status(200).send(signIn);

//     } catch (error) {
//         console.error(error.message);
//         response.status(500).send({ message: error.message });
//     }
// });

// router.post('/', uploadImage, async (request, response) => {
//     try {
//       // Validate the request body fields
//       const { name, email, password } = request.body;
  
//       if (!name || !email || !password) {
//         return response.status(400).send({ message: 'All fields are required.' });
//       }
  
//       // Get the path to the uploaded image file
//       const imagePath = request.file.path;
  
//       // Create a new dog object with image URL
//       const newSignIn = {
//         name,
//         email,
//         password
        
//       };
  
//       // Create a new instance of the Dog model and save it to the database
//       const signIn = await signIn.create(newSignIn);
  
//       return response.status(201).send(signIn);
  
//     } catch (error) {
//       console.log(error.message);
//       response.status(500).send({ message: error.message });
//     }
//   });


// router.put('/:id', async (request, response) => {
//     try {
//         const signInId = request.params.id;

//         // Validate if the provided ID is a valid ObjectId
//         if (!mongoose.Types.ObjectId.isValid(signInId)) {
//             return response.status(400).send({ message: 'Invalid signIn ID' });
//         }

//         const { name, email, password } = request.body;

//         // Validate if at least one field is provided for updating
//         if (!name && !email && !password) {
//             return response.status(400).send({ message: 'At least one field is required for updating.' });
//         }

//         // Find the dog by ID and update the specified fields
//         const updatedSignIn = await signIn.findByIdAndUpdate(
//             signInId,
//             { name, email,password },
//             { new: true } // Return the updated document
//         );

//         if (!updatedSignIn) {
//             return response.status(404).send({ message: 'SignIn not found' });
//         }

//         return response.status(200).send(updatedSignIn);

//     } catch (error) {
//         console.error(error.message);
//         response.status(500).send({ message: error.message });
//     }
// });

// router.delete('/:id', async (request, response) => {
//     try {
//         const signId = request.params.id;

//         // Validate if the provided ID is a valid ObjectId
//         if (!mongoose.Types.ObjectId.isValid(signId)) {
//             return response.status(400).send({ message: 'Invalid signIn ID' });
//         }

//         // Find the dog by ID and delete it
//         const deletedSignIn = await signIn.findByIdAndDelete(signId);

//         if (!deletedSignIn) {
//             return response.status(404).send({ message: 'signIn  not found' });
//         }

//         return response.status(204).send();

//     } catch (error) {
//         console.error(error.message);
//         response.status(500).send({ message: error.message });
//     }
// });

// export default router;