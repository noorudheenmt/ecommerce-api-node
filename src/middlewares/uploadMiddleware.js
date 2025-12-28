import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "#config/cloudinary.js";

// CloudinaryStorage middleware
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ecommerce/products",       
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 800, height: 800, crop: "limit" }],
  },
});

// uplaodProductImages middleware
export const uploadProductImages = multer({
  storage: storage,
  // max 5MB file size 
  limits: { fileSize: 5 * 1024 * 1024 }, 
}).array("images", 5); 


