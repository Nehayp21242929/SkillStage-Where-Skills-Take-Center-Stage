import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPhotos } from "../api/photo";
import { getAllVideos } from "../api/video";
import VideoGrid from "../components/VideoGrid";

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [photoRes, videoRes] = await Promise.all([
          getAllPhotos(),
          getAllVideos(),
        ]);

        setPhotos(photoRes.data.data.slice(0, 4)); // 4 photos
        setVideos(videoRes.data.data.slice(0, 8)); // 8 videos
      } catch (err) {
        console.error("Home fetch error:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="pt-28 px-10 space-y-14 bg-blue-50 dark:bg-black">
      
      {/* 🎥 VIDEOS SECTION */}
      <section>
        <h2 className="text-xl font-semibold mb-5 text-slate-700 dark:text-slate-200">
          Trending Demo
        </h2>

        <VideoGrid videos={videos} />
      </section>

      {/* 🖼 PHOTOS SECTION */}
      <section>
        <h2 className="text-xl font-semibold mb-5 text-slate-700 dark:text-slate-200">
          Recent Post
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {photos.map((photo) => (
           <Link
          to={`/Open/${photo._id}`}
          key={photo._id}
          className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow hover:shadow-lg transition"
        >
          <img
            src={photo.photoFile}
            alt={photo.title}
            className="w-full aspect-video object-cover text-slate-500"
          />

          <div className="p-3">
            <h3 className="font-medium text-sm line-clamp-2 text-slate-500">
              {photo.title}
            </h3>

            <p className="text-xs text-slate-500 mt-1">
              {new Date(photo.createdAt).toLocaleDateString()}
            </p>
          </div>
        </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
