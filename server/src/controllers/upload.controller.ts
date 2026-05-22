import { Request, Response } from "express";
import path from "path";
import upload from "../middlewares/multer";

export const uploadFile = (req: Request, res: Response) => {
  console.log("Hello world")
  upload(req, res, (err: any) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message || "Error uploading file",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // Construct the file URL
    const fileUrl = `/images/${req.file.filename}`;

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      data: {
        url: fileUrl,
        filename: req.file.filename,
        originalname: req.file.originalname,
        size: req.file.size,
      },
    });
  });
};

export const getFile = (req: Request, res: Response) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, '../../public/images', filename);

  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).json({
        success: false,
        message: 'File not found',
      });
    }
  });
};
