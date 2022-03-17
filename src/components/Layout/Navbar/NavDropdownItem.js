import React from "react";

const NavDropdownItem = ({ title, icon }) => {
  return (
    <a href="" className="nav__dropdown-item">
      {/* <i className="bx bxs-add-to-queue nav2__icon"></i> */}
      {icon}
      <span>{title}</span>
    </a>
  );
};

export default NavDropdownItem;
