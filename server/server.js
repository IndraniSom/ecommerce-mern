import app from "./src/app.js"
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB:', error.message)

    }
})();