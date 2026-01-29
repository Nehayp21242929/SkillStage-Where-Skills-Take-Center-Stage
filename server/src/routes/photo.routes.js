import { Router } from "express";
import {
//   getAllVideos,
//   getVideoById,
//   getChannelVideos,
  uploadPhoto,
  galleryPhotoController,
  getPhotoByIdController,
  getAllPhotos
} from "../controllers/photo.controller.js";

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// upload video
router.route("/upload").post(
  verifyJWT,
  upload.single("photoFile"),
  uploadPhoto
);

router.route("/gallery/:userId").get( verifyJWT, galleryPhotoController);

router.route("/playPhoto/:id").get( verifyJWT, getPhotoByIdController);

router.route("/allPhotos").get( getAllPhotos);


export default router;

