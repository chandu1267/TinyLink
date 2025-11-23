import { Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";
const FRONT_BASE = window.location.origin;

function LinkTable({ links, onDeleted }) {
  const handleDelete = async (code) => {
    if (!confirm(`Delete link ${code}?`)) return;

    const res = await fetch(`${API_BASE}/api/links/${code}`, {
      method: "DELETE",
    });

    if (res.status === 204) {
      onDeleted && onDeleted(code);
    } else {
      alert("Failed to delete link.");
    }
  };

  if (!links.length) {
    return (
      <div className="empty-state">
        No links yet. Create your first short link on the left.
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Short URL</th>
            <th>Target URL</th>
            <th>Clicks</th>
            <th>Last clicked</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <tr key={link._id}>
              <td>
                <a
                  className="short-url-link"
                  href={`${API_BASE}/${link.code}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {FRONT_BASE}/{link.code}
                </a>
              </td>
              <td>
                <div className="target-url" title={link.targetUrl}>
                  {link.targetUrl}
                </div>
              </td>
              <td>
                <span className="chip">
                  {link.totalClicks}{" "}
                  <span style={{ opacity: 0.7, marginLeft: 2 }}>clicks</span>
                </span>
              </td>
              <td>
                <span className="chip chip-muted">
                  {link.lastClicked
                    ? new Date(link.lastClicked).toLocaleString()
                    : "—"}
                </span>
              </td>
              <td>
                <div className="action-cell">
                  <Link to={`/code/${link.code}`} className="link-button">
                    Stats
                  </Link>
                  <button
                    type="button"
                    className="link-button"
                    onClick={() => handleDelete(link.code)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LinkTable;
