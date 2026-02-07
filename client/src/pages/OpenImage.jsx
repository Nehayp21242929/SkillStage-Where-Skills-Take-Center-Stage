import { useParams ,  useNavigate} from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { 
  getPhotoById, 
  addToWatchHistoryPhoto, 
  getLikedPhotos,
  addToLikedPhotos,
  deleteLikedPhotos 
} from "../api/photo";
import { useAuth } from "../context/AuthContext";
import { addFeedback, getFeedbacks, getFeedbackAnalytics } from "../api/feedback.api";

const OpenImage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  const [liked, setLiked] = useState(false);
  const [likedPhotos, setLikedPhotos] = useState([]);
  const historyAdded = useRef(false);

  // Feedback state
  const [feedbacks, setFeedbacks] = useState([]);
  const [analytics, setAnalytics] = useState({ avgRating: 0, total: 0 });
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  /* ---------------- Fetch photo ---------------- */
  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const res = await getPhotoById(id);
        setPhoto(res.data.data);
      } catch (err) {
        console.error("Fetch photo error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhoto();
  }, [id]);

  /* ---------------- Add to history ---------------- */
  useEffect(() => {
    if (!photo || historyAdded.current) return;

    const addHistory = async () => {
      try {
        await addToWatchHistoryPhoto({ photoId: photo._id });
        historyAdded.current = true;
      } catch (err) {
        console.error("History error:", err);
      }
    };

    addHistory();
  }, [photo]);

  /* ---------------- Fetch liked photos ---------------- */
  useEffect(() => {
    if (!photo || !user) return;

    const fetchLikedPhotos = async () => {
      try {
        const res = await getLikedPhotos();
        const likedList = res.data.data || [];

        setLikedPhotos(likedList);

        const alreadyLiked = likedList.some(
          (item) => item.photo._id === photo._id
        );

        setLiked(alreadyLiked);
      } catch (err) {
        console.error("Fetch liked photos error:", err);
      }
    };

    fetchLikedPhotos();
  }, [photo, user]);

  /* ---------------- Feedback for this photo ---------------- */
  const fetchFeedbacks = async () => {
    try {
      const res = await getFeedbacks({ demoId: photo._id, demoType: "photo" });
      setFeedbacks(res.data.data || []);

      const statsRes = await getFeedbackAnalytics({
        demoId: photo._id,
        demoType: "photo",
      });
      setAnalytics(statsRes.data.data || { avgRating: 0, total: 0 });
    } catch (err) {
      console.error("Fetch feedbacks error:", err);
    }
  };

  useEffect(() => {
    if (photo) fetchFeedbacks();
  }, [photo]);

  const handleSubmitFeedback = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (rating === 0) return alert("Please select a rating!");

    try {
      await addFeedback({
        demoId: photo._id,
        demoType: "photo",
        rating,
        comment,
      });
      setRating(0);
      setComment("");
      fetchFeedbacks();
    } catch (err) {
      console.error("Submit feedback error:", err);
      alert(err?.response?.data?.message || "Feedback submission failed");
    }
  };

  /* ---------------- Like / Unlike ---------------- */
  const handleLike = async (photoId) => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      if (liked) {
        await deleteLikedPhotos(photoId);
        setLiked(false);
        setLikedPhotos((prev) =>
          prev.filter((item) => item.photo._id !== photoId)
        );
      } else {
        await addToLikedPhotos({ photoId });
        setLiked(true);
      }
    } catch (err) {
      console.error("Like toggle error:", err);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!photo) return <p className="p-6">Photo not found</p>;

  return (
    <div className="p-20 bg-white dark:bg-black min-h-screen">
      <div className="max-w-5xl mx-auto">
        <img
          src={photo.photoFile}
          alt={photo.title}
          className="w-full rounded-xl bg-black"
        />

        <h1 className="mt-4 text-2xl font-bold">{photo.title}</h1>
        <p className="mt-2 text-gray-500">
          {new Date(photo.createdAt).toLocaleDateString()}
        </p>

        <button
          onClick={() => handleLike(photo._id)}
          className={`mt-4 px-4 py-2 rounded-full border transition ${
            liked
              ? "bg-red-500 text-white"
              : "bg-white text-black border-gray-300"
          }`}
        >
          {liked ? "❤️ Liked" : "🤍 Like"}
        </button>

        <p className="mt-2 text-gray-500">{photo.description}</p>

        {/* ---------------- Feedback Section ---------------- */}
        <div className="mt-8 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
          <h2 className="text-xl font-bold mb-2 text-blue-950 dark:text-blue-200">Feedback</h2>

          {/* Star rating */}
          <div className="flex mb-2 text-black dark:text-white">
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
          <h3 className="text-lg font-semibold mb-2 text-black dark:text-blue-200">Recent Feedback</h3>
          {feedbacks.length === 0 && <p>No feedback yet.</p>}
          {feedbacks.map((f) => (
            <div key={f._id} className="border-b py-2 text-black dark:text-gray-50">
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

export default OpenImage;
