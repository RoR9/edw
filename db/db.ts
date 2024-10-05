import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MongoDB connected successfully");
  }
};

export default connectDB;
