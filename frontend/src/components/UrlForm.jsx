import { useState } from "react";
import axios from "axios";
import './UrlForm.css';

function UrlForm() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");


  const handleSubmit = async (e) =>{
    e.preventDefault();

  const urlPattern = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;

if (!urlPattern.test(url)) {
  setError("Please enter a valid URL (http:// or https://)");
    return;
}

  setError("");
  setLoading(true);

  const handleCopy = async ()=>{}
  
  try{
    const response = await axios.post(
      "http://localhost:5000/shorten",
      {originalUrl: url}
    );

    console.log(response.data);

    setShortUrl(`http://localhost:5000/${response.data.shortCode}`);

      setUrl("");
    } catch(error){
      console.error("Error creating short URL :",error);
      alert("Somthing went wrong!");
    }finally{
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

    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

//   console.log(url);

   

//   async function handleSubmit(e) {
//   e.preventDefault();

//   console.log(url);

//   const response = await axios.post(
//     'http://localhost:5000/shorten',
//     {
//       originalUrl: url,
//     }
//   );

//   console.log(response.data);

//   setShortUrl(`http://localhost:5000/${response.data.shortCode}`);
// }

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
    <p className="result-label">Short URL:</p>

    <div className="result-row">
      <a
        href={shortUrl}
        target="_blank"
        rel="noreferrer"
        className="result-link"
      >
        {shortUrl}
      </a>

      <button
        type="button"
        className="copy-btn"
        onClick={handleCopy}
      >
        📋 Copy
      </button>
    </div>
  </div>
)}

{copied && (
  <div className="toast">
    ✅ Link copied to clipboard
  </div>
)}

</div>
</div>
  );
}

export default UrlForm;
