import React from 'react';
import './Header.css';
import { handleClick } from '../../services/general';

export default function Header({ data, showForm, showFilters }) {

  return (
    <header
      className={
        !showFilters && !data && !showForm
          ? "header"
          : "top-right-header"
      }
      onClick={() => handleClick(data, showForm)} // 👈 make it clickable
      style={{ cursor: (data || showForm) ? "pointer" : "default" }} // pointer only when active
    >
      Direct Real Estate
    </header>
  );
}
