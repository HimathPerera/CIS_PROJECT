import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";
import { AuthContext } from "../../../context/auth-context";

const NavLinks = () => {
  const auth = useContext(AuthContext);
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
      {!auth.isLoggedIn && !auth.isAdmin && (
        <li>
          <NavLink to="/authenticate">AUTHENTICATE</NavLink>
        </li>
      )}
      {auth.isAdmin && (
        <li>
          <NavLink to="/authenticate/admin">ADMIN DB</NavLink>
        </li>
      )}
      {(auth.isLoggedIn || auth.isAdmin) && (
        <li>
          <button className="nav-links" onClick={auth.logout}>
            LOGOUT
          </button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
