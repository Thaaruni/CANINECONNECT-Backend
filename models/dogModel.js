//WORKING WITHOUT IMAGE
// import mongoose from "mongoose";

// const DogSchema = mongoose.Schema(
//     {
//         name: {
//             type: String,
//             required: true
//         },
//         age: {
//             type: Number, 
//             required: true
//         },
//         breed: {
//             type: String, 
//             required: true
//         },
//         // image: {
//         //     type: String, 
//         //     required: true
//         // },
//         location: {
//             type: String,
//             required: true
//         },
//        gender: {
//             type: String,
//             required: true,
//             enum: ['Male', 'Female'] 
//         } 
//     }


// );


// export const Dog = mongoose.model('Dog',DogSchema);

//WITH IMAGE
import mongoose from 'mongoose';

const DogSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  breed: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female']
  },
  image: {
    type: String, // Store the path to the uploaded image file
    required: true
  }
});

export const Dog = mongoose.model('Dog', DogSchema);
