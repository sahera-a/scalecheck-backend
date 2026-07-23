import { useState } from "react";

function OrgIntake({ onSubmit }) {
  const [orgName, setOrgName] = useState("");
  const [industry, setIndustry] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [touched, setTouched] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!orgName.trim()) {
      setTouched(true);
      return;
    }
    onSubmit({ orgName: orgName.trim(), industry, teamSize });
  };

  return (
    <div className="intake-card">
      <h2>Let's get to know your organization</h2>
      <p className="intake-subtitle">
        This takes less than a minute — it helps tailor your diagnostic report.
      </p>
      <form onSubmit={handleSubmit}>
        <label>Organization name *</label>
        <input
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
          placeholder="e.g. Acme Corp"
        />
        {touched && !orgName.trim() && (
          <p className="field-error">Please enter your organization name.</p>
        )}

        <label>Industry</label>
        <select value={industry} onChange={(e) => setIndustry(e.target.value)}>
          <option value="">Select industry (optional)</option>
          <option>Banking & Financial Services</option>
          <option>Information Technology</option>
          <option>Healthcare</option>
          <option>Manufacturing</option>
          <option>Retail & E-commerce</option>
          <option>Telecommunications</option>
          <option>Other</option>
        </select>

        <label>Team size involved in this AI initiative</label>
        <select value={teamSize} onChange={(e) => setTeamSize(e.target.value)}>
          <option value="">Select team size (optional)</option>
          <option>1-5</option>
          <option>6-20</option>
          <option>21-50</option>
          <option>50+</option>
        </select>

        <button type="submit" className="primary-button">
          Begin Diagnostic →
        </button>
      </form>
    </div>
  );
}

export default OrgIntake;