import { useEffect, useState } from "react";
import { getChannelVideos } from "../api/video"; 
import { Link } from "react-router-dom";

export default function GalleryVideos({ userId }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await getChannelVideos(userId);
        setVideos(res.data.data); // because ApiResponse -> { data: videos }
      } catch (err) {
        console.error("Gallery fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchVideos();
  }, [userId]);

  if (loading) return <p>Loading gallery...</p>;

  if (!videos.length)
    return <p className="text-slate-500">No uploads yet</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {videos.map((video) => (
        <Link
          to={`/watch/${video._id}`}
          key={video._id}
          className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow hover:shadow-lg transition"
        >
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full aspect-video object-cover"
          />

          <div className="p-3">
            <h3 className="font-medium text-sm line-clamp-2">
              {video.title}
            </h3>

            <p className="text-xs text-slate-500 mt-1">
              {new Date(video.createdAt).toLocaleDateString()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
