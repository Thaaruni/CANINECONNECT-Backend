//WITH IMAGE
import mongoose from 'mongoose';

const VehicleSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  contact: {
    type: Number,
    required: true
  }, 
  email: {
    type : String,
    required: true
  },
  vehiclename: {
    type: String,
    required: true
  },
  model: {
    type:String ,
    required: true
  },
  image: {
    type: String, // Store the path to the uploaded image file
    required: true
  }
});

export const Vehicle = mongoose.model('Vehicle', VehicleSchema);




// import mongoose from "mongoose";

// const VehicleSchema = mongoose.Schema(
//     {
//         brand: {
//             type: String,
//             required: true
//         },
//         model: {
//             type: String,
//             required: true
//         },
       
//         color: {
//             type: String,
//             required: true
//         },
//         price: {
//             type: Number,
//             required: true
//         },
//         location: {
//             type: String,
//             required: true
//         },
//         type: {
//             type: String,
//             required: true,
//             enum: ['Car', 'Van', 'Truck'] 
//         }
//     }
// );

// export const Vehicle = mongoose.model('Vehicle', VehicleSchema);


