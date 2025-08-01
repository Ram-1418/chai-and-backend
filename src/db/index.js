import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB=async()=>{
    console.log(process.env.MONGODB_URL);
    
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host} `)
    } catch (error) {
        console.dir(error);
        
        console.log("MONGODB CONNECTION ERROR",error)
        process.exit(1)
    }
}

export default connectDB