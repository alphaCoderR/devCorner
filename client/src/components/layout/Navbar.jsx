import React from "react";
import {Link} from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 style={{color: "#feffff"}}>
        <Link class="Logo" to="/">
          <i class="fas fa-code"></i> DevCorner
        </Link>
      </h1>
      <ul>
        <li>
          <Link to="#">Posts</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link className="login" to="/login">Log In</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;