import React from 'react';

import './Header.css';

export default function Header({ data, showForm }) {
  return (
    <header
      className={
        !data && !showForm
          ? "header"
          : "top-right-header"
      }
    >
      Direct Real Estate
    </header>
  );
}
