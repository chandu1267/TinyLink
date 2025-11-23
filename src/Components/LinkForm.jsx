import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

function LinkForm({ onCreated }) {
  const [targetUrl, setTargetUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/links`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUrl, code: code || undefined }),
      });

      if (res.status === 409) {
        setError("This code is already taken. Try a different one.");
      } else if (!res.ok) {
        setError("Failed to create link. Please try again.");
      } else {
        await res.json();
        onCreated && onCreated();
        setTargetUrl("");
        setCode("");
      }
    } catch (err) {
      setError("Network error. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="label">Long URL</label>
        <input
          type="url"
          className="input"
          value={targetUrl}
          onChange={(e) => setTargetUrl(e.target.value)}
          required
          placeholder="https://example.com/your/very/long/link"
        />
        <p className="helper-text">
          We’ll generate a short URL that redirects here.
        </p>
      </div>

      <div className="form-group">
        <label className="label">
          Custom code <span style={{ opacity: 0.7 }}>(optional)</span>
        </label>
        <input
          type="text"
          className="input"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="e.g. chandu-demo, my-portfolio"
        />
        <p className="helper-text">
          If left empty, a random code will be generated.
        </p>
      </div>

      {error && <p className="error-text">{error}</p>}

      <div className="btn-row">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Creating…" : "Create short link"}
        </button>
      </div>
    </form>
  );
}

export default LinkForm;
