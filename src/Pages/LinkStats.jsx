import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function LinkStats() {
  const { code } = useParams();
  const [link, setLink] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchLink = async () => {
      const res = await fetch(`${API_BASE}/api/links/${code}`);
      if (res.status === 404) {
        setNotFound(true);
      } else {
        const data = await res.json();
        setLink(data);
      }
    };
    fetchLink();
  }, [code]);

  if (notFound) {
    return (
      <>
        <p>Link not found.</p>
        <Link to="/">Back to dashboard</Link>
      </>
    );
  }

  if (!link) return <p>Loading...</p>;

  return (
    <div>
      <h2>Stats for: {link.code}</h2>
      <p>Target URL: {link.targetUrl}</p>
      <p>Total clicks: {link.totalClicks}</p>
      <p>
        Last clicked:{" "}
        {link.lastClicked ? new Date(link.lastClicked).toLocaleString() : "—"}
      </p>
      <p>Created at: {new Date(link.createdAt).toLocaleString()}</p>
      <Link to="/">Back to dashboard</Link>
    </div>
  );
}

export default LinkStats;
