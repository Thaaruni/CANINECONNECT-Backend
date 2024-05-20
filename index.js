import  express from "express";
import {PORT, URL} from "./config.js";
import mongoose from 'mongoose';
import vehicleRoute from './routes/vehicleRoute.js'
import dogsRoute from "./routes/dogsRoute.js";
import dogHandlerRoute from "./routes/dogHandlerRoute.js"
import VeterinarianRoute from "./routes/VeterinarianRoute.js";
import cors from "cors";


 
const app = express();
app.use(cors());

app.use(express.json());

app.use('/dogs',dogsRoute);

app.use('/vehicles',vehicleRoute);

app.use('/handlers',dogHandlerRoute);

app.use('/veterinarians', VeterinarianRoute);
app.use('/Users', Users);

app.use("/uploads", express.static("uploads"));    //created an API with route /add which utilizes the multer middleware and stores the image in uploard folder
   



app.listen(PORT, ()=>{
    console.log(`App is listening to port : ${PORT} `);
});

mongoose.connect(URL).then(()=>{
    console.log('App connected to database');
    }).catch((error)=>{
    console.log(error);
});


