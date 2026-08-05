import { useState } from "react";
import { SECTOR_QUESTIONS, DIMENSION_LABELS } from "./questions";
import axios from "axios";
import ResultSkeleton from "./ResultSkeleton";

function Questionnaire({ orgInfo, onResult, onError }) {
  const QUESTIONS = SECTOR_QUESTIONS[orgInfo?.sector] || SECTOR_QUESTIONS.general;
  const DIMENSIONS = Object.keys(QUESTIONS);

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(
    DIMENSIONS.reduce((acc, dim) => {
      acc[dim] = QUESTIONS[dim].map(() => 2);
      return acc;
    }, {})
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const currentDim = DIMENSIONS[step];
  const isLastStep = step === DIMENSIONS.length - 1;

  const handleAnswerChange = (qIndex, value) => {
    setAnswers((prev) => {
      const updated = { ...prev };
      updated[currentDim] = [...updated[currentDim]];
      updated[currentDim][qIndex] = Number(value);
      return updated;
    });
  };

  const handleNext = () => {
    if (!isLastStep) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "https://ion-scale-check-diagnostic.onrender.com/assessment",
        {
          org_name: orgInfo?.orgName || "Unnamed Org",
          industry: orgInfo?.industry || "",
          team_size: orgInfo?.teamSize || "",
          sector: orgInfo?.sector || "general",
          answers: answers,
        }
      );
      onResult(response.data);
    } catch (err) {
      setError("Something went wrong submitting your assessment. Check that the backend server is running.");
      if (onError) onError();
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ResultSkeleton />;
  }

  return (
    <div className="questionnaire">
      <div className="progress-bar">
        Step {step + 1} of {DIMENSIONS.length}
      </div>

      <h2>{DIMENSION_LABELS[currentDim]}</h2>

      {QUESTIONS[currentDim].map((question, qIndex) => (
        <div className="question-block" key={qIndex}>
          <p>{question}</p>
          <input
            type="range"
            min="0"
            max="4"
            value={answers[currentDim][qIndex]}
            onChange={(e) => handleAnswerChange(qIndex, e.target.value)}
          />
          <span>{answers[currentDim][qIndex]} / 4</span>
        </div>
      ))}

      {error && <p className="error">{error}</p>}

      <div className="nav-buttons">
        {step > 0 && <button onClick={handleBack}>Back</button>}
        {!isLastStep && <button onClick={handleNext}>Next</button>}
        {isLastStep && (
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Submitting..." : "Submit Assessment"}
          </button>
        )}
      </div>
    </div>
  );
}

export default Questionnaire;