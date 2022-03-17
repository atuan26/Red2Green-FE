import React from "react";
import NavLink from "./NavLink";
import NavList from "./NavList";
import { FiLogOut } from "react-icons/fi";
import NavLogo from "./NavLogo";
import "./Navbar.css";

const Navbar = () => {
	return (
		<div className=" h-screen lg:block    ">
			<div className="w-60 my-4 ml-4 shadow-lg nav__container fixed bg-white h-full rounded-2xl dark:bg-gray-700">
				<NavLogo />

				<NavList />

				<NavLink
					title="Logout"
					icon={<FiLogOut className="nav__icon" />}
					classname=" nav__logout"
				/>
			</div>
		</div>
	);
};

export default Navbar;
