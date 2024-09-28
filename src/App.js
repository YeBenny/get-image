import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 

  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = async () => {
    setError('');
    setImageSrc('');
    setLoading(true); // Set loading to true
    try {
      const response = await axios.get(url, { withCredentials: true, responseType: 'blob' });
      const imageUrl = URL.createObjectURL(response.data);
      setImageSrc(imageUrl);
    } catch (err) {
      setError('Failed to fetch the image. Please check the URL.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="App">
      <header className="App-header">
    <div className="container">
      <h1>Image Fetcher</h1>
      <input
        type="url"
        value={url}
        onChange={handleChange}
        placeholder="Enter a URL"
        required
        className="url-input"
      />
      <button onClick={handleSubmit} className="confirm-button">Confirm</button>

      {loading && <p className="loading-message">Loading...</p>} {/* Loading indicator */}
      {error && <p className="error-message">{error}</p>}
      {imageSrc && <img src={imageSrc} alt="Fetched" className="fetched-image" />}
    </div>
      </header>
    </div>
  );
}

export default App;
