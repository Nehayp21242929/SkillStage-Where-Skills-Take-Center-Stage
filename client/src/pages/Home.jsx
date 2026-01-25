import VideoGrid from "../components/VideoGrid"
import { dummyVideos } from "../data/dummyVideos"

const Home = () => {
  return (
    <div className="p-6">
      <VideoGrid videos={dummyVideos} />
    </div>
  )
}

export default Home
