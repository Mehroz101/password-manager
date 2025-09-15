import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req: Express.Request, file: Express.Multer.File) => ({
    folder: "uploads",
    format: (() => {
      const ext = file.mimetype.split("/").pop();
      if (["jpeg", "jpg", "png"].includes(ext)) {
        return ext;
      }
      return "jpg";
    })(),
    // Optionally, you can set public_id or other params here
  }),
});

// Multer Upload Middleware for Cloudinary
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // Limit file size to 2MB
});


export default upload;
