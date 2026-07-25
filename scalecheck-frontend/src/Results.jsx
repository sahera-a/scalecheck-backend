import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { DIMENSION_LABELS, SHORT_DIMENSION_LABELS } from "./questions";
function generateNarrative(result) {
  const { org_name, overall_score, risk_flags } = result;

  if (risk_flags.length === 0) {
    return `${org_name} shows a strong, balanced structure across all five readiness dimensions, with an overall score of ${overall_score}/100. No major structural failure modes were flagged — the primary risk from here is complacency, not collapse.`;
  }

  const flagNames = risk_flags.map((f) => f.type).join(" and ");
  return `${org_name} scores ${overall_score}/100 overall. The diagnostic flags risk of ${flagNames}. This pattern mirrors what the underlying research identifies as the leading cause of stalled pilot-to-production conversion in Indian enterprises: not budget constraints, but structural and governance gaps that widen the longer they go unaddressed.`;
}

function Results({ result, onRestart, onFeedback }) {
  const { org_name, dimension_scores, overall_score, risk_flags } = result;

 const chartData = Object.entries(dimension_scores).map(([key, value]) => ({
  dimension: SHORT_DIMENSION_LABELS[key] || key,
  score: value,
}));

  return (
    <div className="results">
      <p className="overall-score-label">{org_name} — Overall Readiness</p>
      <p className="overall-score">{overall_score}/100</p>

      <div className="risk-badges">
        {risk_flags.length === 0 && (
          <span className="risk-badge" style={{ background: "#3a7d5c" }}>
            No major risk flags
          </span>
        )}
        {risk_flags.map((flag, i) => (
          <span key={i} className={`risk-badge ${flag.severity}`}>
            {flag.type} — {flag.severity}
          </span>
        ))}
      </div>

     <ResponsiveContainer width="100%" height={330}>
  <RadarChart data={chartData} outerRadius="58%" margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
    <PolarGrid stroke="#ddd" />
    <PolarAngleAxis dataKey="dimension" tick={{ fill: "#0a1f44", fontSize: 11, fontWeight: 600 }} />
    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#888", fontSize: 9 }} />
    <Radar name="Score" dataKey="score" stroke="#c9a24b" fill="#c9a24b" fillOpacity={0.4} />
  </RadarChart>
</ResponsiveContainer>

      <div className="report-section">
        <h3>Diagnostic Report</h3>
        <p>{generateNarrative(result)}</p>
      </div>

      <div className="about-framework">
        This diagnostic operationalizes the OIN framework (Ownership, Integration,
        Narrative) from the whitepaper "Stalled Pilot-to-Production Conversion Amid
        Economic Tightening," which argues that organizational structure and
        governance — not budget cuts — are the primary variables explaining why
        Indian enterprise AI pilots fail to reach production.
      </div>

      <div className="results-actions">
        <button className="cta-button" onClick={onFeedback}>
          Share Feedback
        </button>
        <button className="restart-button" onClick={onRestart}>
          Start New Assessment
        </button>
      </div>
    </div>
  );
}

export default Results;