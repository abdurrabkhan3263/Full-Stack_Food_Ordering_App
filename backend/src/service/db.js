import mongoose from "mongoose";

async function connection() {
  try {
    return await mongoose.connect(
      `${process.env.MONGODB_URL}/${process.env.DB_NAME}`
    );
  } catch (error) {
    console.error("MONGODB CONNECTION ERROR:- ", error);
    process.exit(1);
  }
}

export default connection;
