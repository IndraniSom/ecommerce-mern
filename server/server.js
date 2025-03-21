import app from "./src/app.js"
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from "./utils/logger.js";
dotenv.config();

(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        logger.info('Connected to MongoDB');
    } catch (error) {
        logger.error(`Error connecting to MongoDB: ${error.message}`)
    }
})();