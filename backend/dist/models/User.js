"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const uploadFileSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    pdf: { type: String, required: true },
});
const userSchema = new mongoose_1.default.Schema({
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
exports.default = mongoose_1.default.model("User", userSchema);
