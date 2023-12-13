import React from "react";
import { Link } from "react-router-dom";

import "./footer.scss";
export const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="contact-info">
        <span>
          <Link to="/NamasTech" className="namastech">
            &copy; NamasTech 2023
          </Link> 
        </span>
        <ul>
          <li>
            <Link to="/kontakt" className="kontakt">
              Kontakt
            </Link>
          </li>
          <li>
            <Link to="/Impressum" className="impressum">
              Impressum
            </Link>
          </li>
          <li>
            <Link to="/datenschutz" className="datenschutz">
              Datenschutz
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};
