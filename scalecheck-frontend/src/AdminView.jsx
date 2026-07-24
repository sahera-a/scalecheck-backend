import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://ion-scale-check-diagnostic.onrender.com";

function AdminView() {
  const [submissions, setSubmissions] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("submissions");

  useEffect(() => {
    async function load() {
      try {
        const [s, f, c] = await Promise.all([
          axios.get(`${BASE_URL}/admin/submissions`),
          axios.get(`${BASE_URL}/admin/feedback`),
          axios.get(`${BASE_URL}/admin/contact`),
        ]);
        setSubmissions(s.data);
        setFeedback(f.data);
        setContacts(c.data);
      } catch (err) {
        console.error("Failed to load admin data", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return <div className="admin-view"><p>Loading admin data...</p></div>;
  }

  return (
    <div className="admin-view">
      <h1>ScaleCheck — Admin</h1>
      <div className="admin-tabs">
        <button className={tab === "submissions" ? "active" : ""} onClick={() => setTab("submissions")}>
          Submissions ({submissions.length})
        </button>
        <button className={tab === "feedback" ? "active" : ""} onClick={() => setTab("feedback")}>
          Feedback ({feedback.length})
        </button>
        <button className={tab === "contacts" ? "active" : ""} onClick={() => setTab("contacts")}>
          Contact Messages ({contacts.length})
        </button>
      </div>

      {tab === "submissions" && (
        <table className="admin-table">
          <thead>
            <tr><th>Org</th><th>Sector</th><th>Overall Score</th><th>Risk Flags</th><th>Date</th></tr>
          </thead>
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
          <thead>
            <tr><th>Org</th><th>Rating</th><th>Comment</th><th>Date</th></tr>
          </thead>
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
          <thead>
            <tr><th>Name</th><th>Email</th><th>Message</th><th>Date</th></tr>
          </thead>
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