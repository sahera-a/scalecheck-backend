import { useState, useEffect } from "react";
import Landing from "./Landing";
import OrgIntake from "./OrgIntake";
import Questionnaire from "./Questionnaire";
import Results from "./Results";
import Feedback from "./Feedback";
import AdminView from "./AdminView";
import "./App.css";

function App() {
  const [view, setView] = useState("landing");
  const [orgInfo, setOrgInfo] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (window.location.hash === "#admin") {
      setView("admin");
    }
  }, []);

  const handleRestart = () => {
    setOrgInfo(null);
    setResult(null);
    window.location.hash = "";
    setView("landing");
  };

  const steps = ["Org Info", "Assessment", "Results", "Feedback"];
  const stepIndex = { intake: 0, questionnaire: 1, results: 2, feedback: 3 }[view];

  if (view === "admin") {
    return <AdminView />;
  }

  return (
    <div className={`app ${view === "landing" ? "app-landing" : ""}`}>
      {view !== "landing" && (
        <div className="app-header">
          <h1>ScaleCheck</h1>
          <p>An OIN Diagnostic for Pilot-to-Production Readiness</p>
          <div className="stepper">
            {steps.map((label, i) => (
              <div
                key={label}
                className={`stepper-item ${i === stepIndex ? "active" : ""} ${
                  i < stepIndex ? "done" : ""
                }`}
              >
                <span className="stepper-dot">{i + 1}</span>
                <span className="stepper-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === "landing" && <Landing onStart={() => setView("intake")} />}

      {view === "intake" && (
        <OrgIntake
          onSubmit={(info) => {
            setOrgInfo(info);
            setView("questionnaire");
          }}
        />
      )}

      {view === "questionnaire" && (
        <Questionnaire
          orgInfo={orgInfo}
          onResult={(res) => {
            setResult(res);
            setView("results");
          }}
        />
      )}

      {view === "results" && (
        <Results result={result} onRestart={handleRestart} onFeedback={() => setView("feedback")} />
      )}

      {view === "feedback" && <Feedback orgName={orgInfo?.orgName} onDone={handleRestart} />}
    </div>
  );
}

export default App;