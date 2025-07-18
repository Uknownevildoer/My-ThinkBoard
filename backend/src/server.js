import express from "express";
import cors from "cors"
import dotenv from "dotenv";

import notesRoutes from "./routes/notesroutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000


// middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(rateLimiter);
app.use("/api/notes", notesRoutes);


// our simple custom middleware
// app.use((req,res,next)=>{
//     console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//     next()
// })

connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log("server started on PORT:",PORT) 
    })
})
