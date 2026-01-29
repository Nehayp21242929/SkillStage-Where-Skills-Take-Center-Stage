import { Link } from "react-router-dom"

const VideoCard = ({ video }) => {
  return (
    <Link to={`/watch/${video._id}`}>
      <div className="cursor-pointer bg-gray-200 rounded-xl hover:border-blue-400 hover:border">
        <img
          src={video.thumbnail}
          alt="thumbnail"
          className="w-full h-48 object-cover rounded-tr-xl rounded-tl-xl"
        />

        <div className=" p-2">
          <h3 className="font-semibold line-clamp-2">
            {video.title}
          </h3>
          <p className="text-sm text-gray-400">{video.views} views</p>
          <p className="text-sm text-gray-400">{new Date(video.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </Link>
  )
}

export default VideoCard
