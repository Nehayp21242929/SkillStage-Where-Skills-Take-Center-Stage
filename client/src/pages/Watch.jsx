import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import {
  getVideoById,
  addToWatchHistoryVideos,
  getLikedVideos,
  addToLikedVideos,
  deleteLiked,
} from "../api/video";
import { useAuth } from "../context/AuthContext";
import {
  addFeedback,
  getFeedbacks,
  getFeedbackAnalytics,
} from "../api/feedback.api"; // <-- Import feedback API

const Watch = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likedVideos, setLikedVideos] = useState([]);

  // Feedback state
  const [feedbacks, setFeedbacks] = useState([]);
  const [analytics, setAnalytics] = useState({ avgRating: 0, total: 0 });
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const videoRef = useRef(null);
  const historyAdded = useRef(false);

  /* ---------------- Fetch video ---------------- */
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await getVideoById(id);
        setVideo(res.data.data);
      } catch (err) {
        console.error("Fetch video error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  /* ---------------- Watch history ---------------- */
  const handleAddToHistory = async () => {
    if (!user || !videoRef.current || historyAdded.current) return;

    try {
      await addToWatchHistoryVideos({
        videoId: video._id,
        watchTime: Math.floor(videoRef.current.currentTime),
      });
      historyAdded.current = true;
    } catch (err) {
      console.error("History error:", err);
    }
  };

  /* ---------------- Fetch liked videos ---------------- */
  useEffect(() => {
    if (!video || !user) return;

    const fetchLikedVideos = async () => {
      try {
        const res = await getLikedVideos();
        const likedList = res.data.data || [];

        setLikedVideos(likedList);
        const alreadyLiked = likedList.some(
          (item) => item.video._id === video._id
        );
        setLiked(alreadyLiked);
      } catch (err) {
        console.error("Fetch liked videos error:", err);
      }
    };

    fetchLikedVideos();
  }, [video, user]);

  /* ---------------- Feedback for this video ---------------- */
  const fetchFeedbacks = async () => {
    try {
      const res = await getFeedbacks({ demoId: video._id, demoType: "video" });
      setFeedbacks(res.data.data || []);

      const statsRes = await getFeedbackAnalytics({
        demoId: video._id,
        demoType: "video",
      });
      setAnalytics(statsRes.data.data || { avgRating: 0, total: 0 });
    } catch (err) {
      console.error("Fetch feedbacks error:", err);
    }
  };

  useEffect(() => {
    if (video) fetchFeedbacks();
  }, [video]);

  const handleSubmitFeedback = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (rating === 0) return alert("Please select a rating!");

    try {
      await addFeedback({
        demoId: video._id,
        demoType: "video",
        rating,
        comment,
      });
      setRating(0);
      setComment("");
      fetchFeedbacks(); // Refresh feedbacks & analytics
    } catch (err) {
      console.error("Submit feedback error:", err);
    }
  };

  /* ---------------- Like / Unlike ---------------- */
  const handleLike = async (videoId) => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      if (liked) {
        await deleteLiked(videoId);
        setLiked(false);
        setLikedVideos((prev) =>
          prev.filter((item) => item.video._id !== videoId)
        );
      } else {
        await addToLikedVideos({
          videoId,
          watchTime: videoRef.current
            ? Math.floor(videoRef.current.currentTime)
            : 0,
        });
        setLiked(true);
      }
    } catch (err) {
      console.error("Like toggle error:", err);
    }
  };

  /* ---------------- UI ---------------- */
  if (loading) return <p className="p-6">Loading...</p>;
  if (!video) return <p className="p-6">Video not found</p>;

  return (
    <div className="pt-20 bg-white dark:bg-black min-h-screen">
      <div className="max-w-5xl mx-auto">
        <video
          ref={videoRef}
          src={video.videoFile}
          controls
          autoPlay
          className="w-full aspect-video rounded-xl bg-black"
          onPlay={handleAddToHistory}
        />

        <h1 className="mt-4 text-2xl font-bold">{video.title}</h1>
        <p className="mt-2 text-gray-500">
          {new Date(video.createdAt).toLocaleDateString()}
        </p>

        <button
          onClick={() => handleLike(video._id)}
          className={`mt-4 px-4 py-2 rounded-full border transition ${
            liked
              ? "bg-red-500 text-white"
              : "bg-white text-black border-gray-300"
          }`}
        >
          {liked ? "❤️ Liked" : "🤍 Like"}
        </button>

        <p className="mt-4 text-gray-500">{video.description}</p>

        {/* ---------------- Feedback Section ---------------- */}
        <div className="mt-8 p-4 border rounded-md bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
          <h2 className="text-xl font-bold mb-2 text-blue-950 dark:text-blue-200">Feedback</h2>

          {/* Star rating */}
          <div className="flex mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`cursor-pointer text-2xl ${
                  star <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>

          {/* Comment box */}
          <textarea
            className="w-full border p-2 rounded mb-2 dark:bg-gray-800 dark:text-white"
            placeholder="Add a short comment (optional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            onClick={handleSubmitFeedback}
          >
            Submit Feedback
          </button>

          {/* Analytics */}
          <p className="font-semibold mb-2 text-black dark:text-white">
            Average Rating: {analytics.avgRating?.toFixed(1) || 0} / 5 (
            {analytics.total || 0} feedbacks)
          </p>

          {/* Feedback list */}
          <h3 className="text-lg font-semibold mb-2 text-black dark:text-gray-50">Recent Feedback</h3>
          {feedbacks.length === 0 && <p>No feedback yet.</p>}
          {feedbacks.map((f) => (
            <div key={f._id} className="border-b py-2">
              <div>
                {"★".repeat(f.rating) + "☆".repeat(5 - f.rating)}
              </div>
              {f.comment && <p>{f.comment}</p>}
              {f.user && (
                <p className="text-sm text-gray-500">
                  - {f.user.name || f.user.username}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Watch;
