import { Router } from "express";
import {
//   getAllVideos,
//   getVideoById,
//   getChannelVideos,
  uploadVideo
} from "../controllers/video.controller.js";

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// upload video
router.route("/upload").post(
  verifyJWT,
  upload.fields([
    { name: "videoFile", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 }
  ]),
  uploadVideo
);

// // watch page
// router.route("/")
//   .get(getAllVideos);

// // channel videos
// router.route("/channel/:channelId")
//   .get(getChannelVideos);

// // watch single video
// router.route("/:videoId")
//   .get(getVideoById);

export default router;

