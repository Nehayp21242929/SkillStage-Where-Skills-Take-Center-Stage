import { useParams } from "react-router-dom"

const Watch = () => {
  const { id } = useParams()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Watch Page</h1>
      <p className="text-gray-400">Video ID: {id}</p>

      <div className="mt-6 bg-black aspect-video rounded-xl flex items-center justify-center">
        <p className="text-gray-500">Video Player Here</p>
      </div>
    </div>
  )
}

export default Watch
