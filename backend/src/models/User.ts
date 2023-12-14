import mongoose from "mongoose";

const uploadFileSchema = new mongoose.Schema({
  title: { type: String, required: true },
  pdf: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  uploadedFiles: [uploadFileSchema],
});

export default mongoose.model("User",userSchema)
