import { Router } from "express";
import { upload } from "../utils/multer";
import {
  uploadFileController,
  getFile,
  createFile,
  getallfiles,
} from "../controllers/fileController";

const fileRoutes = Router();

fileRoutes.post("/upload/:userId", upload.single("file"), uploadFileController);
fileRoutes.post("/create/:userId/:fileId", upload.single("file"), createFile);
fileRoutes.get("/getfile/:userId/:fileId", getFile);
fileRoutes.get("/getallfiles/:userId", getallfiles);


export default fileRoutes;
