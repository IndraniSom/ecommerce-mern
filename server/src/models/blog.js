import mongoose from "mongoose";
const { Schema } = mongoose;


const blogSchema = new Schema({
    author: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    slug:{
        type: String,
        required: true
    },
    excerpt: {
        type: String,
        required: true,
    },
    content: {
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
