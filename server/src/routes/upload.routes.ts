import { Router } from "express";
import { uploadFile, getFile } from "../controllers/upload.controller";

const router = Router();

// Upload a file
router.post("/", uploadFile);

// Get a file by filename
router.get("/:filename", getFile);

export default router;
