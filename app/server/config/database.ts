import mongoose from "mongoose";
require("dotenv").config();
const uri = process.env.MONGODB_URI;

(async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || uri;
    if (!mongoURI) {
      throw new Error("MongoDB URI is not specified");
    }

    const connection = await mongoose.connect(mongoURI);

    if (connection) {
      console.log("Connected to MongoDB");
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
