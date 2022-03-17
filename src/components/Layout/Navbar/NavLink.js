import React from "react";
import { IoIosArrowDown } from "react-icons/io";

const NavLink = ({ title, icon, dropDown, classname }) => {
  return (
    <a href="#" className={classname ? "nav__link" + classname : "nav__link"}>
      {icon}
      <span className="nav__name">{title}</span>
      {dropDown && (
        <IoIosArrowDown className=" nav__dropdown-icon" />
      )}
    </a>
  );
};

export default NavLink;
