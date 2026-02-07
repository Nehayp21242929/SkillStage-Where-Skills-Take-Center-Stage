import API from "./auth"; // reuse your axios instance

// Add or update feedback (requires auth)
export const addFeedback = ({ demoId, demoType, rating, comment }) => {
  return API.post("/feedback/add", { demoId, demoType, rating, comment });
};

// Get all feedbacks for a demo (video or photo)
export const getFeedbacks = ({ demoId, demoType }) => {
  return API.get(`/feedback/${demoId}/${demoType}`);
};

// Get feedback analytics for a demo
export const getFeedbackAnalytics = ({ demoId, demoType }) => {
  return API.get(`/feedback/${demoId}/${demoType}/analytics`);
};
