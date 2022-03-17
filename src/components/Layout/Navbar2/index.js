import React, { useState } from "react";
import NavItem from "./NavItem";
import { AiFillGift, AiOutlineApi, AiOutlineSetting } from "react-icons/ai";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { FaChartLine } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { MdSwitchAccount, MdSpaceDashboard } from "react-icons/md";
import { IoWallet } from "react-icons/io5";
import { RiFolderUserFill } from "react-icons/ri";
import { IoIosStats } from "react-icons/io";

const Navbar = () => {
	const [currentTab, setCurrentTab] = useState(window.location.pathname);
	const navItem1 = [
		{
			title: "Dashboard",
			icon: <MdSpaceDashboard />,
			notification: 0,
			href: "/",
		},
		{
			title: "Trading",
			icon: <FaChartLine />,
			notification: 3,
			href: "/trading",
		},
		{
			title: "Calendar",
			icon: <BsFillCalendar2WeekFill />,
			notification: 0,
			href: "/calendar",
		},
		{
			title: "MANAGE",
		},
		{
			title: "Airdrop",
			icon: <AiFillGift />,
			notification: 13,
			href: "/airdrop",
		},
		{
			title: "Signals",
			icon: <MdSpaceDashboard />,
			notification: 0,
			href: "/signals",
		},
		{
			title: "Wallet",
			icon: <IoWallet />,
			notification: 0,
			href: "/wallet",
		},
		{
			title: "ADMIN",
		},
		{
			title: "Admin",
			icon: <GrUserAdmin />,
			notification: 0,
			href: "http://127.0.0.1:8000/admin",
			target: "_blank",
		},
		{
			title: "User",
			icon: <RiFolderUserFill />,
			notification: 0,
			href: "/user",
		},
		{
			title: "Activity",
			icon: <IoIosStats />,
			notification: 0,
			href: "/activity-log",
		},
		{
			title: "API",
			icon: <AiOutlineApi />,
			notification: 0,
			href: "/api",
		},
		{
			title: "System",
			icon: <AiOutlineSetting />,
			notification: 0,
			href: "/system",
		},
	];
	return (
		<div className="fixed top-0 left-0 z-30 flex min-h-screen overflow-y-auto no-scrollbar">
			<div className=" w-52 h-screen bg-white xl:w-56 dark:bg-gray-800">
				<nav className="mt-10 px-6 ">
					{navItem1.map((item, index) => {
						return item.icon ? (
							<NavItem
								key={index}
								active={item.href === currentTab && true}
								onClick={() => setCurrentTab(item.href)}
								{...item}
							/>
						) : (
							<p
								key={index}
								className="text-gray-400 ml-2 w-full border-b-2 pb-2 pt-4 border-gray-100 mb-1 text-md font-normal"
							>
								{item.title}
							</p>
						);
					})}
				</nav>
				<div className="absolute bottom-0 my-10">
					<a
						className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-200 flex items-center py-2 px-8"
						href="#"
					>
						<svg
							width="20"
							fill="currentColor"
							height="20"
							className="h-5 w-5"
							viewBox="0 0 1792 1792"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M1088 1256v240q0 16-12 28t-28 12h-240q-16 0-28-12t-12-28v-240q0-16 12-28t28-12h240q16 0 28 12t12 28zm316-600q0 54-15.5 101t-35 76.5-55 59.5-57.5 43.5-61 35.5q-41 23-68.5 65t-27.5 67q0 17-12 32.5t-28 15.5h-240q-15 0-25.5-18.5t-10.5-37.5v-45q0-83 65-156.5t143-108.5q59-27 84-56t25-76q0-42-46.5-74t-107.5-32q-65 0-108 29-35 25-107 115-13 16-31 16-12 0-25-8l-164-125q-13-10-15.5-25t5.5-28q160-266 464-266 80 0 161 31t146 83 106 127.5 41 158.5z"></path>
						</svg>
						<span className="mx-4 font-medium">Support</span>
					</a>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
