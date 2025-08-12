import React from 'react';

import './Footer.css';

export default function Footer() {
  return (
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
  );
}
