import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import "../../styles/feedback.css";

function FeedbackManagement() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get("https://yug-backend-3v83.onrender.com/api/contact/all");
      setFeedbacks(res.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReview = async (id) => {
    try {
      await axios.put(`https://yug-backend-3v83.onrender.com/api/contact/${id}/review`);

      setFeedbacks((prev) =>
        prev.map((f) =>
          f._id === id ? { ...f, isReviewed: true } : f
        )
      );
      toast.success("Marked as reviewed");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://yug-backend-3v83.onrender.com/api/contact/${id}`);

      setFeedbacks((prev) =>
        prev.filter((f) => f._id !== id)
      );
      toast.success("Deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete feedback");
    }
  };

  const filteredFeedbacks = feedbacks.filter((f) => {
    if (filter === "pending") return !f.isReviewed;
    if (filter === "reviewed") return f.isReviewed;
    return true;
  });

  if (isLoading) {
    return <div>Loading feedbacks...</div>;
  }

  return (
    <div className="feedback-container">
      <div className="feedback-content">
        <div className="feedback-wrapper">

          <h1 className="feedback-title">Feedback Management</h1>
          <p className="feedback-subtitle">Manage customer feedback</p>

          <div className="filter-buttons">
            {["all","pending","reviewed"].map(tab => (
              <button
                key={tab}
                className={filter === tab ? "active" : ""}
                onClick={() => setFilter(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="feedback-grid">
            {filteredFeedbacks.map(f => (
              <div className="feedback-card" key={f._id}>

                <div className="feedback-header">
                  <h3>{f.name}</h3>
                  <span className={`status ${f.isReviewed ? "reviewed" : "pending"}`}>
                    {f.isReviewed ? "Reviewed" : "Pending"}
                  </span>
                </div>

                <p>📞 {f.mobile}</p>

                <p className="feedback-message">"{f.message}"</p>

                <p className="feedback-date">
                  {new Date(f.createdAt).toLocaleString()}
                </p>

                <div className="actions">
                  {!f.isReviewed && (
                    <button
                      className="btn-review"
                      onClick={() => handleReview(f._id)}
                    >
                      Review
                    </button>
                  )}

                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(f._id)}
                  >
                    Delete
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default FeedbackManagement;
