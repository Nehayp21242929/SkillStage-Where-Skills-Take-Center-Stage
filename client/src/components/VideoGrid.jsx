import VideoCard from "./VideoCard"

const VideoGrid = ({ videos }) => {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-blue-50 dark:bg-black">

      {videos.map(video => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  )
}

export default VideoGrid
