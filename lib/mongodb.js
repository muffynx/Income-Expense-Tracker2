// lib/mongodb.js

import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        console.log("MongoDB URI:", process.env.MONGODB_URI); // Add this line for debugging
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB:", error); // Update this line
    }
};
