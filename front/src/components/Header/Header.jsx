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
      onClick={() => handleClick()}
      style={{ cursor: (data || showForm || showFilters) ? "pointer" : "default" }}
    >
      Direct Real Estate
    </header>
  );
}
