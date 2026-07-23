import { useState } from "react";
import Questionnaire from "./Questionnaire";
import Results from "./Results";
import "./App.css";

function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="app">
      <h1>ScaleCheck</h1>
      <p>An OIN Diagnostic for Pilot-to-Production Readiness</p>

      {!result && <Questionnaire onResult={setResult} />}
      {result && <Results result={result} onRestart={() => setResult(null)} />}
    </div>
  );
}

export default App;