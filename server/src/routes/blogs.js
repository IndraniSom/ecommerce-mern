import { Router } from "express";
import {
  getBlogs,
  createBlog,
  getBlogsBySlug,
  deleteBlogById,
  updateBlogById,
} from "../controllers/blogsController.js";
import multer from "multer";
import { cloudinary } from "../app.js";
import fs from "fs";
import { isAdmin } from "../middlewares/authMiddleware.js";
import auth from "../middlewares/authMiddleware.js";

// Creating uploads folder if not already present
// In "uploads" folder we will temporarily upload
// image before uploading to cloudinary
if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

export async function uploadToCloudinary(locaFilePath) {
  // locaFilePath: path of image which was just
  // uploaded to "uploads" folder

  let mainFolderName = "blogs";
  // filePathOnCloudinary: path of image we want
  // to set when it is uploaded to cloudinary
  let filePathOnCloudinary = mainFolderName + "/" + locaFilePath.split("\\")[1];

  return cloudinary.uploader
    .upload(locaFilePath, { public_id: filePathOnCloudinary })
    .then((result) => {
      // Image has been successfully uploaded on
      // cloudinary So we dont need local image
      // file anymore
      // Remove file from local uploads folder
      fs.unlinkSync(locaFilePath);

      return {
        message: "Success",
        url: result.url,
      };
    })
    .catch((error) => {
      // Remove file from local uploads folder
      logger.error(error);
      fs.unlinkSync(locaFilePath);
      return { message: "Fail" };
    });
}

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

let upload = multer({ storage: storage });

const router = Router();

router.get("/", getBlogs);
router.get("/:slug", getBlogsBySlug);
router.put("/:id", auth, isAdmin, upload.single("image"), updateBlogById);
router.post("/create", auth, isAdmin, upload.single("image"), createBlog);
router.delete("/:id", auth, isAdmin, deleteBlogById);
export default router;
