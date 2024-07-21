import mongoose from "mongoose";

const connectDB = async () => {
  try {
 const connectionInstance= await mongoose.connect(process.env.MONGO_DB)
 console.log(`\n MongoDB connected ! DB host: ${connectionInstance.connection.host}`);
  } 
  catch (error) {
    console.log("mongo db connection error");
    process.exit(1);
  }
};

export default connectDB;
