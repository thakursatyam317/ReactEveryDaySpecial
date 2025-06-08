import mongoose from 'mongoose';

const connectDb = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongoose is connect : ", conn.connection.host);
        
    }
    catch(e){
        console.log(e);
        process.exit(1);
    }
}
export default connectDb;
