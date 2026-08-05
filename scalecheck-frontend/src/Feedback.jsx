import { useState } from "react";
import axios from "axios";

function Feedback({ orgName, onDone, onToast }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (rating === 0) return;
    setLoading(true);
    setError(null);
    try {
      await axios.post("https://ion-scale-check-diagnostic.onrender.com/feedback", {
        org_name: orgName,
        rating,
        comment,
      });
      setSubmitted(true);
      if (onToast) onToast("Thanks for your feedback!", "success");
    } catch (err) {
      setError("Couldn't submit feedback right now — please try again.");
      if (onToast) onToast("Couldn't submit feedback", "error");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="feedback-card feedback-thanks">
        <h2>Thank you!</h2>
        <p>Your feedback helps improve this diagnostic.</p>
        <button className="restart-button" onClick={onDone}>
          Start New Assessment
        </button>
      </div>
    );
  }

  return (
    <div className="feedback-card">
      <h2>How was your experience?</h2>
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            className={`star ${(hoverRating || rating) >= n ? "filled" : ""}`}
            onMouseEnter={() => setHoverRating(n)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(n)}
          >
            ★
          </span>
        ))}
      </div>
      <textarea
        placeholder="Any thoughts on the diagnostic? (optional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      {error && <p className="error">{error}</p>}
      <div className="nav-buttons">
        <button onClick={handleSubmit} disabled={rating === 0 || loading}>
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>
        <button className="restart-button" onClick={onDone}>
          Skip
        </button>
      </div>
    </div>
  );
}

export default Feedback;