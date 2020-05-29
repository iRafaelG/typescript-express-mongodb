// imports node modules
import { Schema, model } from "mongoose";

const PostSchema = new Schema({
    title: { type: String, required: true },
    url: { type: String, required: true, unique: true, lowercase: true },
    content: { type: String, required: true },
    image: String,
    created_at: { type: Date, default: Date.now },
    updated_at: Date
});

export default model('Post', PostSchema);