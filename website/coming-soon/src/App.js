import React, { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send email to Formspree endpoint for email capture
    try {
      await fetch('https://formspree.io/f/xwkgrwqg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
    } catch (err) {
      // Ignore errors for now
    }
    setSubmitted(true);
  };

  return (
    <div className="coming-soon-container">
      <div className="coming-soon-content">
        <img src="/logo.png" alt="ModNest Logo" className="logo" />
        <h1>ModNest</h1>
        <p style={{fontWeight: 500, fontSize: '1.2rem'}}>Coming Soon</p>
        <p>We're working hard to launch something amazing.<br />Sign up below to get notified when we go live!</p>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="signup-form">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button type="submit">Notify Me</button>
          </form>
        ) : (
          <div className="thank-you">Thank you! You'll be the first to know.</div>
        )}
      </div>
      <footer>
        <small>&copy; {new Date().getFullYear()} ModNest. All rights reserved.</small>
      </footer>
    </div>
  );
}

export default App;
