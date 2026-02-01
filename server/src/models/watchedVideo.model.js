import mongoose from "mongoose";
const { Schema } = mongoose;

const watchHistorySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    video: {
      type: Schema.Types.ObjectId,
      ref: "Video",
      required: true,
      index: true
    },
    watchTime: {
      type: Number, // seconds watched
      default: 0
    },
    watchedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// 🔑 Important indexes
watchHistorySchema.index({ user: 1, video: 1 });

export const WatchHistoryVideo = mongoose.model(
  "WatchHistoryVideo",
  watchHistorySchema
);
