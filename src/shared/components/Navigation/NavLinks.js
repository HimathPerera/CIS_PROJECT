import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = (props) => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/about" exact>
          ABOUT US
        </NavLink>
      </li>
      <li>
        <a
          href="https://arpicosupercentre.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          SHOP WITH US
        </a>
      </li>
      <li>
        <NavLink to="/authenticate">AUTHENTICATE</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
