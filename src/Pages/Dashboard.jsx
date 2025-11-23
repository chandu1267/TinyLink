import { useEffect, useState } from "react";
import LinkForm from "../Components/LinkForm.jsx";
import LinkTable from "../Components/LinkTable.jsx";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

function Dashboard() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLinks = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/links`);
      const data = await res.json();
      setLinks(data);
    } catch (err) {
      console.error("Error fetching links:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleCreated = () => {
    fetchLinks();
  };

  const handleDeleted = (code) => {
    setLinks((prev) => prev.filter((l) => l.code !== code));
  };

  return (
    <div className="app-content-grid">
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">Create short link</h2>
            <p className="card-description">
              Paste any long URL and optionally use a custom code.
            </p>
          </div>
        </div>
        <LinkForm onCreated={handleCreated} />
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">Your links</h2>
            <p className="card-description">
              Recently created links with click stats and quick actions.
            </p>
          </div>
        </div>

        {loading ? (
          <p className="empty-state">Loading links…</p>
        ) : (
          <LinkTable links={links} onDeleted={handleDeleted} />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
