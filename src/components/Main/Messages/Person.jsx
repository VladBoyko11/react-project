import React from "react";
import { NavLink } from "react-router-dom";
import style from './Messages.module.css'
import '../../Navbar/Navbar.module.css'

const Person = (props) => {
  return (
    <NavLink to={`/messages/${props.id}`} className={style.person}>{props.name}</NavLink>
  );
};

export default Person
