import React from 'react';
import './Header.css';

export default function Header({ data, showForm }) {
  const handleClick = () => {
    if (data || showForm) {
      window.location.reload(); // refresh the page
    }
  };

  return (
    <header
      className={
        !data && !showForm
          ? "header"
          : "top-right-header"
      }
      onClick={handleClick} // 👈 make it clickable
      style={{ cursor: (data || showForm) ? "pointer" : "default" }} // pointer only when active
    >
      Direct Real Estate
    </header>
  );
}
