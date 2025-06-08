import express from 'express';
import connectDb from './src/config/db.js';
import AuthRouter from './src/router/authRouter.js'
import cors from 'cors';



const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', AuthRouter)



app.get('/',(req,res)=>{
    res.status(200).json({"message" : "Server is working"});
})


const port = process.env.PORT||4000;

app.listen(port, ()=>{
    console.log("Server is connect :", port);
    connectDb();
})