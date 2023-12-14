import { Request, RequestHandler, Response } from "express";
import User from "../models/User";

export const uploadFileController = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const title = req.file.originalname;
    const { filename, path } = req.file;

    try {
      // await Pdf.create({ title: title, pdf: filename });
      const user = await User.findById(userId);
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
      await user.save();

      const uploadedPdf = user.uploadedFiles[user.uploadedFiles.length - 1];

      return res.status(200).json({
        status: "ok",
        filename,
        uploadedPdfId: uploadedPdf._id,
      });
    } catch (error) {
      console.error("Error creating Pdf document:", error);
      return res.status(500).json({ message: "Error creating Pdf document" });
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createFile = async (req: Request, res: Response) => {
  const { userId, fileId } = req.params;
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const { title } = req.body;
    const { filename, path } = req.file;
    const user = await User.findById(userId);

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
  } catch (error) {
    console.error("Error creating Pdf document:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getFile: RequestHandler = async (req, res) => {
  const { userId, fileId } = req.params;
  console.log(userId, fileId);

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(500).json("no user exist");
    }
    const uploadedFile = user.uploadedFiles.find(
      (file) => file._id?.toString() === fileId
    );
    if (!uploadedFile) {
      return { error: "PDF file not found for the given user" };
    }
    return res.status(200).json({ pdf: uploadedFile.pdf });
  } catch (error) {
    console.error("Error fetching Pdf documents:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//getall files
export const getallfiles: RequestHandler = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const uploadedFiles = user.uploadedFiles as {
      title: string;
      pdf: string;
    }[];

    return res.status(200).json({ uploadedFiles });
  } catch (error) {
    console.error("Error fetching user files:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
