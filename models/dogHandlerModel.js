import mongoose from "mongoose";

const dogHandlerSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        telNo: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        experiences: {
            type: String,
            required: true
        },
        image: {
            type: String, // Assuming you'll store the image URL
            required: true
        },
        certificateImage: {
            type: String, // Assuming you'll store the certificate image URL
            required: true
        },
    }
);

export const DogHandler = mongoose.model('DogHandler', dogHandlerSchema);



// import mongoose from "mongoose";

// const dogHandlerSchema = mongoose.Schema(
//     {
//         name: {
//             type: String,
//             required: true
//         },
//         age: {
//             type: Number, 
//             required: true
//         },
//         experience: {
//             type: String, 
//             required: true
//         },
//         location: {
//             type: String,
//             required: true
//         },
      
//     }
// );

// export const DogHandler = mongoose.model('DogHandler', dogHandlerSchema);
