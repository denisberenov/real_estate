import React from 'react';
import './App.css';

export default function App() {
  return (
    <div className="app-container">
      <header className="header">Direct RE</header>
      
      <div className="button-container">
        <button className="button">Upload</button>
        <button className="button">Search</button>
      </div>

      <footer className="footer">
        <p>© 2025 Direct RE. All rights reserved.</p>
        <p>
          <a href="https://example.com/privacy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>{' '}
          |{' '}
          <a href="https://example.com/terms" target="_blank" rel="noopener noreferrer">
            Terms of Service
          </a>
        </p>
      </footer>
    </div>
  );
}
