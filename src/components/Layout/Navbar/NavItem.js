import React from "react";
import NavDropdown from "./NavDropdown";
import NavLink from "./NavLink";

const NavItem = ({ title, navItem }) => {
  return (
    <div className="nav__items">
      <h3 className="nav__subtitle">{title}</h3>
      {navItem.map((item, i) =>
        item.dropDown ? (
          <NavDropdown
            key={i}
            title={item.title}
            icon={item.icon}
            subTitle={item.subTitle}
          />
        ) : (
          <NavLink key={i} title={item.title} icon={item.icon} />
        )
      )}
    </div>
  );
};

export default NavItem;
