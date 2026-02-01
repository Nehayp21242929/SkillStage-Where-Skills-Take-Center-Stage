import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getVideoById, addToWatchHistoryVideos } from "../api/video";

const Watch = () => {
  const { id } = useParams(); // video ID from URL
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);
  const historyAdded = useRef(false); // avoid duplicate API calls

  // Fetch video data
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await getVideoById(id);
        setVideo(res.data.data); // adjust if your backend structure differs
      } catch (err) {
        console.error("Fetch video error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  // Function to send watch history
  const handleAddToHistory = async () => {
    if (!videoRef.current || historyAdded.current) return;

    try {
      await addToWatchHistoryVideos({
        videoId: video._id,
        watchTime: Math.floor(videoRef.current.currentTime),
      });
      historyAdded.current = true; // mark as added
      console.log("✅ Watch history updated");
    } catch (err) {
      console.error("❌ History error:", err);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!video) return <p className="p-6">Video not found</p>;

  return (
    <div className="pt-20 bg-white dark:bg-black min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Video player */}
        <video
          ref={videoRef}
          src={video.videoFile}
          controls
          autoPlay
          className="w-full aspect-video rounded-xl bg-black"
          onPlay={handleAddToHistory} // send watch history when video starts
        />

        <h1 className="mt-4 text-2xl font-bold">{video.title}</h1>
        <p className="mt-2 text-gray-500">
          {new Date(video.createdAt).toLocaleDateString()}
        </p>
        <p className="mt-2 text-gray-500">{video.description}</p>
      </div>
    </div>
  );
};

export default Watch;
