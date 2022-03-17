import React, { useState } from "react";
import NavDropdownItem from "./NavDropdownItem";
import NavLink from "./NavLink";

const NavDropdown = ({ title, icon, subTitle }) => {
  const [onClick, setOnClick] = useState(false);
  console.log(onClick);
  return (
    <div
      className={onClick ? "nav__dropdown__expand" : "nav__dropdown"}
      onClick={() => setOnClick((pre) => !pre)}
    >
      <NavLink title={title} icon={icon} dropDown={true} />

      <div className="nav__dropdown-collapse">
        <div className="nav__dropdown-content">
          {subTitle.map((title, i) => (
            <NavDropdownItem key={i} title={title.title} icon={title.icon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavDropdown;
