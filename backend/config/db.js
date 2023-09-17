import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://musharafz2k3:parwez123@mernauth.ibqtq7v.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log(`MongoDB connected : ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDb;
