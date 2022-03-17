import React from "react";
import { SiTimescale } from "react-icons/si";

const HeaderLogo = () => {
  return (
    <a href="" className="nav__link nav__logo">
      <SiTimescale className="nav__icon" />
      <span className="nav__logo-name">AT</span>
    </a>
  );
};

export default HeaderLogo;
