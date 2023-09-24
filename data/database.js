import mongoose from "mongoose";

export const connnectDb = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName : "thepizzerium"
    }).then(()=>console.log("Database connected"))
    .catch((e)=>console.log(e))
}

