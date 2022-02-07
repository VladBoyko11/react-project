import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={style.nav}>
      <ul className={style.navLink}>
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
        <li>
          <NavLink to="/messages">Messages</NavLink>
        </li>
        <li>
          <NavLink to="/users">Users</NavLink>
        </li>
        <li>
          <a href="/News">News</a>
        </li>
        <li>
          <a href="/Music">Music</a>
        </li>
        <li>
          <a href="/Settings">Settings</a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
