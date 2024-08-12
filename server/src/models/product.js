import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    countInStock: {
        type: Number,
    },
    cta: {
        type: String,
    },
    rating: {
        type: Number,
    },
    numReviews: {
        type: Number,
    },
    reviews: [
        {
            name: { type: String, required: true },
            rating: { type: Number, required: true },
            comment: { type: String, required: true },
        },
    ],
    featured:{
        type: Boolean,
        default: false,
    }

}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;