import { useNavigate } from "react-router-dom";

const UploadForm = ({ onSuccess }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto mt-50 p-6 rounded-xl shadow-md 
                    bg-gray-300 dark:bg-gray-900
                    text-black dark:text-white">

      <h2 className="text-2xl font-semibold text-center mb-6">
        Upload Content
      </h2>

      <div className="space-y-4">
        <button
          onClick={() => navigate("/upload")}
          className="w-full py-4 rounded-lg font-medium
                     bg-blue-600 text-white
                     hover:bg-blue-500
                     transition duration-200"
        >
          Upload Video
        </button>

        <button
          onClick={() => navigate("/uploadPhoto")}
          className="w-full py-4 rounded-lg font-medium
                     bg-blue-600 text-white
                     hover:bg-blue-500
                     transition duration-200"
        >
          Upload Photo
        </button>
      </div>
    </div>
  );
};

export default UploadForm;
