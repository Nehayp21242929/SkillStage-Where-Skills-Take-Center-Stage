import API from "./auth"; // reuse your axios instance

// Upload video
export const uploadPhoto = (formData) => {
  return API.post("/photos/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

// Get all published videos (home/watch page)
export const getAllPhotos = () => {
  return API.get("/photos/allPhotos");
};

// Get single video
export const getPhotoById = (videoId) => {
  return API.get(`/photos/playphoto/${photoId}`);
};

// Get all videos of a channel
export const getChannelPhoto = (userId) => {
  return API.get(`/photo/gallery/${userId}`);
};