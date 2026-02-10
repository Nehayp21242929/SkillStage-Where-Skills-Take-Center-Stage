import { useState } from "react";
import { uploadPhoto } from "../api/photo";
import { useNavigate } from "react-router-dom";

export default function UploadPhoto() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !duration || !photo) {
      return alert("All fields are required");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("duration", duration);
    formData.append("photoFile", photo);

    try {
      setLoading(true);
      await uploadPhoto(formData);
      alert("Upload successful ✅");
      navigate("/photos");
    } catch (err) {
      console.error(err);
      alert("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Upload Photo</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded" />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="w-full p-2 border rounded" />
        <input type="number" placeholder="Duration (seconds)" value={duration} onChange={e => setDuration(e.target.value)} className="w-full p-2 border rounded" />
        <div className="flex flex-col space-y-2">
          <label>Photo File</label>
          <input type="file" accept="image/*" onChange={e => setPhoto(e.target.files[0])} />
        </div>
        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}

// axios.post(url, formData, {
//   onUploadProgress: (progressEvent) => {
//     const percent = Math.round(
//       (progressEvent.loaded * 100) / progressEvent.total
//     );
//     setUploadPercent(percent);
//   }
// });
