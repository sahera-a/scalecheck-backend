import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar,
} from "recharts";

const BASE_URL = "https://ion-scale-check-diagnostic.onrender.com";
const PIE_COLORS = ["#3a7d5c", "#b23a3a"];

function AdminView() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [submissions, setSubmissions] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [tab, setTab] = useState("overview");

  useEffect(() => {
    const saved = sessionStorage.getItem("scalecheck_admin_pw");
    if (saved) {
      setPassword(saved);
      handleLogin(saved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (pw) => {
    setAuthError(null);
    setLoading(true);
    try {
      const headers = { "X-Admin-Password": pw };
      const [s, f, c] = await Promise.all([
        axios.get(`${BASE_URL}/admin/submissions`, { headers }),
        axios.get(`${BASE_URL}/admin/feedback`, { headers }),
        axios.get(`${BASE_URL}/admin/contact`, { headers }),
      ]);
      setSubmissions(s.data);
      setFeedback(f.data);
      setContacts(c.data);
      setAuthed(true);
      sessionStorage.setItem("scalecheck_admin_pw", pw);
    } catch (err) {
      setAuthError("Incorrect password.");
      sessionStorage.removeItem("scalecheck_admin_pw");
    } finally {
      setLoading(false);
    }
  };

  if (!authed) {
    return (
      <div className="admin-login">
        <h2>Admin Access</h2>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin(password)}
        />
        <button onClick={() => handleLogin(password)} disabled={loading}>
          {loading ? "Checking..." : "Enter"}
        </button>
        {authError && <p className="error">{authError}</p>}
      </div>
    );
  }

  const total = submissions.length;
  const passed = submissions.filter((s) => (s.risk_flags || []).length === 0).length;
  const failed = total - passed;
  const successRate = total ? Math.round((passed / total) * 100) : 0;
  const avgScore = total
    ? Math.round(submissions.reduce((sum, s) => sum + (s.overall_score || 0), 0) / total)
    : 0;

  const dayMap = {};
  submissions.forEach((s) => {
    const day = new Date(s.timestamp).toLocaleDateString("en-IN", { month: "short", day: "numeric" });
    dayMap[day] = (dayMap[day] || 0) + 1;
  });
  const dailyData = Object.entries(dayMap).map(([day, count]) => ({ day, count }));

  const pieData = [
    { name: "Passed (no risk flags)", value: passed },
    { name: "Flagged risk", value: failed },
  ];

  const sectorMap = {};
  submissions.forEach((s) => {
    const sector = s.sector || "general";
    sectorMap[sector] = (sectorMap[sector] || 0) + 1;
  });
  const sectorData = Object.entries(sectorMap).map(([sector, count]) => ({ sector, count }));

  const exportCSV = () => {
    const headers = ["org_name", "sector", "overall_score", "risk_flags", "timestamp"];
    const rows = submissions.map((s) => [
      s.org_name,
      s.sector || "",
      s.overall_score,
      (s.risk_flags || []).map((f) => f.type).join("; "),
      s.timestamp,
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.map((v) => `"${v}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "scalecheck_submissions.csv";
    a.click();
  };

  return (
    <div className="admin-view">
      <h1>ScaleCheck — Admin</h1>
      <div className="admin-tabs">
        <button className={tab === "overview" ? "active" : ""} onClick={() => setTab("overview")}>Overview</button>
        <button className={tab === "submissions" ? "active" : ""} onClick={() => setTab("submissions")}>Submissions ({submissions.length})</button>
        <button className={tab === "feedback" ? "active" : ""} onClick={() => setTab("feedback")}>Feedback ({feedback.length})</button>
        <button className={tab === "contacts" ? "active" : ""} onClick={() => setTab("contacts")}>Contact ({contacts.length})</button>
      </div>

      {tab === "overview" && (
        <>
          <div className="stat-cards">
            <div className="stat-card"><span className="stat-card-value">{total}</span><span className="stat-card-label">Total Assessments</span></div>
            <div className="stat-card"><span className="stat-card-value">{passed}</span><span className="stat-card-label">Passed (No Flags)</span></div>
            <div className="stat-card"><span className="stat-card-value">{failed}</span><span className="stat-card-label">Flagged Risk</span></div>
            <div className="stat-card"><span className="stat-card-value">{successRate}%</span><span className="stat-card-label">Success Rate</span></div>
            <div className="stat-card"><span className="stat-card-value">{avgScore}</span><span className="stat-card-label">Average Score</span></div>
            <div className="stat-card"><span className="stat-card-value">{feedback.length}</span><span className="stat-card-label">Feedback Received</span></div>
          </div>

          <div className="charts-grid">
            <div className="chart-box">
              <h4>Daily Activity</h4>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={dailyData}>
                  <CartesianGrid stroke="#eee" />
                  <XAxis dataKey="day" fontSize={11} />
                  <YAxis allowDecimals={false} fontSize={11} />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#c9a24b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-box">
              <h4>Pass vs Flagged</h4>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={70} label>
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-box">
              <h4>Submissions by Sector</h4>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={sectorData}>
                  <CartesianGrid stroke="#eee" />
                  <XAxis dataKey="sector" fontSize={11} />
                  <YAxis allowDecimals={false} fontSize={11} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#0a1f44" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <button className="primary-button" style={{ maxWidth: 220, marginTop: 24 }} onClick={exportCSV}>
            Export CSV
          </button>
        </>
      )}

      {tab === "submissions" && (
        <table className="admin-table">
          <thead><tr><th>Org</th><th>Sector</th><th>Score</th><th>Risk Flags</th><th>Date</th></tr></thead>
          <tbody>
            {submissions.map((s) => (
              <tr key={s.id}>
                <td>{s.org_name}</td>
                <td>{s.sector || "—"}</td>
                <td>{s.overall_score}</td>
                <td>{(s.risk_flags || []).map((f) => f.type).join(", ") || "None"}</td>
                <td>{new Date(s.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {tab === "feedback" && (
        <table className="admin-table">
          <thead><tr><th>Org</th><th>Rating</th><th>Comment</th><th>Date</th></tr></thead>
          <tbody>
            {feedback.map((f) => (
              <tr key={f.id}>
                <td>{f.org_name}</td>
                <td>{"★".repeat(f.rating)}</td>
                <td>{f.comment || "—"}</td>
                <td>{new Date(f.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {tab === "contacts" && (
        <table className="admin-table">
          <thead><tr><th>Name</th><th>Email</th><th>Message</th><th>Date</th></tr></thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.message}</td>
                <td>{new Date(c.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminView;