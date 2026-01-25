import { Link } from "react-router-dom"

const VideoCard = ({ video }) => {
  return (
    <Link to={`/watch/${video.id}`}>
      <div className="cursor-pointer">
        <img
          src={video.thumbnail}
          alt="thumbnail"
          className="w-full h-48 object-cover rounded-xl"
        />

        <div className="mt-2">
          <h3 className="font-semibold line-clamp-2">
            {video.title}
          </h3>
          <p className="text-sm text-gray-400">{video.channel}</p>
          <p className="text-sm text-gray-400">{video.views} views</p>
        </div>
      </div>
    </Link>
  )
}

export default VideoCard
