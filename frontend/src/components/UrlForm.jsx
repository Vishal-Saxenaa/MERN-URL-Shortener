import { useState, useEffect } from "react";
import axios from "axios";
import "./UrlForm.css";

function UrlForm() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  useEffect(() => {
    document.body.classList.remove("light-theme", "dark-theme");

    document.body.classList.add(darkMode ? "dark-theme" : "light-theme");

    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const urlPattern = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;

    if (!urlPattern.test(url)) {
      setError("Please enter a valid URL (http:// or https://)");
      return;
    }

    setError("");
    setLoading(true);

    const API_URL = import.meta.env.VITE_API_URL;

    try {
      const response = await axios.post(
        "https://url-shortener-9ijr.onrender.com/shorten",
        {
          originalUrl: url,
        },
      );

      setShortUrl(`${API_URL}/${response.data.shortCode}`);
      setUrl("");
    } catch (error) {
      console.error("Error creating short URL:", error);
      setError("Failed to create short URL. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);

      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);
      setError("Unable to copy link.");
    }
  };

  return (
    <>
      <button
        type="button"
        className="theme-btn"
        onClick={() => setDarkMode((prev) => !prev)}
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      <div className={`url-container ${darkMode ? "dark" : "light"}`}>
        <div className="url-card">
          <h1 className="url-title">URL Shortener</h1>

          <p className="url-subtitle">
            Paste your long URL and get a short, shareable link instantly.
          </p>

          <form className="url-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                className="url-input"
                placeholder="Enter your long URL..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />

              {error && <p className="error-text">{error}</p>}
            </div>

            <button
              type="submit"
              className="url-btn"
              disabled={!url.trim() || loading}
            >
              {loading ? (
                <span className="btn-loading">
                  <span className="spinner"></span>
                  <span>Creating...</span>
                </span>
              ) : (
                "Shorten URL"
              )}
            </button>
          </form>

          {shortUrl && (
            <div className="result-box">
              <h3 className="success-title">
                🎉 Link Generated Successfully 🎉
              </h3>

              <p className="result-label">Your short URL is ready.</p>

              <div className="result-row">
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="result-link"
                >
                  {shortUrl}
                </a>

                <div className="action-buttons">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="copy-btn"
                  >
                    📋 Copy
                  </button>

                  <a
                    href={shortUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="open-btn"
                  >
                    ↗ Open
                  </a>
                </div>
              </div>
            </div>
          )}

          {showToast && (
            <div className="toast">✅ Link copied to clipboard</div>
          )}
        </div>
      </div>
    </>
  );
}

export default UrlForm;
