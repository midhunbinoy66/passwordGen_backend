import mongoose from 'mongoose'


export const connectDb = async ()=>{
    try {
        if(process.env.MONGO_URI){
         await   mongoose.connect(process.env.MONGO_URI)
         console.log(`MongoDB connected: ${mongoose.connection.host}`);

        }
    } catch (error) {
        console.log(error);
    }

   
}