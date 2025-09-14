import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path:'./'
})
console.log("MONGODB_URL:", process.env.MONGODB_URL);

connectDB()

.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`server is running at port :${process.env.PORT}`)

    })
    app.on("error",(error)=>{
        console.log("ERR",error)
        throw error
    })
})
.catch((error)=>{
    console.log(" MONGO db connection failed !!!",error)
})

 











// import express from "express";
// const app=express()

// ( async()=>{
// try {
//     await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//     application.on("error",(error)=>{
//         console.log("ERRR:",error);
//         throw  error
        
//     })
//     app.listtn(process.env.PORT,()=>{
//         console.log(`App is listing on port${process.env.PORT}`)
        
//     })
// } catch (error) {
//     console.log("ERRR:",error)
// }
// })()