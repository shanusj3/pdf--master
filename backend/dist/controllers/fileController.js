"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getallfiles = exports.getFile = exports.createFile = exports.uploadFileController = void 0;
const User_1 = __importDefault(require("../models/User"));
const uploadFileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const title = req.file.originalname;
        const { filename, path } = req.file;
        try {
            // await Pdf.create({ title: title, pdf: filename });
            const user = yield User_1.default.findById(userId);
            if (!user) {
                console.log("User not found!");
                return;
            }
            const newUpload = {
                title: title,
                pdf: path,
            };
            console.log(path);
            user.uploadedFiles.push(newUpload);
            yield user.save();
            const uploadedPdf = user.uploadedFiles[user.uploadedFiles.length - 1];
            return res.status(200).json({
                status: "ok",
                filename,
                uploadedPdfId: uploadedPdf._id,
            });
        }
        catch (error) {
            console.error("Error creating Pdf document:", error);
            return res.status(500).json({ message: "Error creating Pdf document" });
        }
    }
    catch (error) {
        console.error("Error uploading file:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.uploadFileController = uploadFileController;
const createFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, fileId } = req.params;
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const { title } = req.body;
        const { filename, path } = req.file;
        const user = yield User_1.default.findById(userId);
        if (!user) {
            console.log("User not found");
            return;
        }
        const fileIndex = user.uploadedFiles.findIndex((file) => {
            return fileId && file._id && file._id.toString() === fileId.toString();
        });
        if (fileIndex === -1) {
            console.log("File not found");
            return;
        }
        user.uploadedFiles[fileIndex].title = title;
        user.uploadedFiles[fileIndex].pdf = path;
        user.save();
        return res.status(200).json({ message: "ok", title: title, id: fileId });
    }
    catch (error) {
        console.error("Error creating Pdf document:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.createFile = createFile;
const getFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, fileId } = req.params;
    console.log(userId, fileId);
    try {
        const user = yield User_1.default.findById(userId);
        if (!user) {
            return res.status(500).json("no user exist");
        }
        const uploadedFile = user.uploadedFiles.find((file) => { var _a; return ((_a = file._id) === null || _a === void 0 ? void 0 : _a.toString()) === fileId; });
        if (!uploadedFile) {
            return { error: "PDF file not found for the given user" };
        }
        return res.status(200).json({ pdf: uploadedFile.pdf });
    }
    catch (error) {
        console.error("Error fetching Pdf documents:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getFile = getFile;
//getall files
const getallfiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const user = yield User_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const uploadedFiles = user.uploadedFiles;
        return res.status(200).json({ uploadedFiles });
    }
    catch (error) {
        console.error("Error fetching user files:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getallfiles = getallfiles;
