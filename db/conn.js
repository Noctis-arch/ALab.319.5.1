import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URI);

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;