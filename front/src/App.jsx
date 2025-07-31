import React from 'react';
import './App.css';

export default function App() {
  return (
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <button className="button">Upload</button>
      <button className="button">Search</button>
    </div>
  );
}
