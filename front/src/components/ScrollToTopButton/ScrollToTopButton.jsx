import React, { useState, useEffect } from "react";
import "./ScrollToTopButton.css";
import { scrollToTop } from "../../services/general";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  // Show button only when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    visible && (
      <button className="scroll-to-top" onClick={scrollToTop}>
        ↑ Top
      </button>
    )
  );
}
