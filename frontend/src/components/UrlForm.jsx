import { useState } from "react";
import axios from "axios";
import './UrlForm.css';
import { Link } from "react-router-dom";

function UrlForm() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [shortCode, setShortCode] = useState("");


  const handleSubmit = async (e) =>{
    e.preventDefault();

  const urlPattern = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;

if (!urlPattern.test(url)) {
  setError("Please enter a valid URL (http:// or https://)");
    return;
}

 setError("");
setLoading(true);

try {

  const response = await axios.post(
    "http://localhost:5000/shorten",
    {
      originalUrl: url
    }
  );

  setShortCode(response.data.shortCode);

  setShortUrl(`http://localhost:5000/${response.data.shortCode}`);

  setUrl("");

} catch (error) {

  console.error("Error creating short URL :", error);
  setError("Failed to create short URL. Please try again.");

} finally {

  setLoading(false);

}
  };

    const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);

    } catch (error) {

  console.error("Error creating short URL:", error);
  setError("Failed to create short URL. Please try again.");

}
  };



  return (
  <div className="url-container">
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

    {error && (
      <p className="error-text">
        {error || ""}
      </p>
    )}
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

    <p className="result-label">
      Your short URL is ready.
    </p>

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
          className="copy-btn"
          onClick={handleCopy}
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

        <Link
          to={`/analytics/${shortCode}`}
          className="analytics-btn"
          >
        📊 Analytics
        </Link>

      </div>

    </div>

  </div>
)}

</div>
</div>
  );
}

export default UrlForm;
