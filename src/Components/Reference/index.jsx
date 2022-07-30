import React from "react";
import "./styles.scss";

const Reference = () => {
  return (
    <div className="ref">
      <p className="ref-text">
        Coded by <b>Steven Lucano</b>
      </p>
      <a
        className="ref-link ref-link-hover"
        href="https://github.com/stevenLucano"
        target="_blank"
      >
        <span className="link-icon">
          <i className="bi bi-github icon-link"></i>
        </span>
        <span className="link-title">stevenLucano</span>
      </a>
    </div>
  );
};

export default Reference;
