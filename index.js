import  express  from "express";
import { config } from "dotenv";
import cors from "cors"
import { connnectDb } from "./data/database.js";
import router from "./routes/userRoutes.js";

const app = express();

config({
    path: "./config.env"
})

//middlewares
app.use(express.json()); // position is important
app.use(router)
app.use(cors())

connnectDb();

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on: ${process.env.PORT} `)
})