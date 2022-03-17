import React from "react";
import NavItem from "./NavItem";
import { AiFillGift, AiOutlineApi, AiOutlineSetting } from "react-icons/ai";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { FaChartLine } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import {
  MdSwitchAccount,
  MdSpaceDashboard,
  MdDataExploration,
} from "react-icons/md";
import { IoWallet } from "react-icons/io5";
import { RiFolderUserFill } from "react-icons/ri";
import { IoIosStats } from "react-icons/io";

const NavList = () => {
  const classIcon1 = "nav__icon";
  const classIcon2 = "nav2__icon inline-block";
  const navItem1 = [
    {
      title: "Dashboard",
      icon: <MdSpaceDashboard className={classIcon1} />,
      dropDown: false,
    },
    {
      title: "Trading",
      icon: <FaChartLine className={classIcon1} />,
      dropDown: false,
    },
    {
      title: "Calendar",
      icon: <BsFillCalendar2WeekFill className={classIcon1} />,
      dropDown: false,
    },
    {
      title: "Manage",
      icon: <MdDataExploration className={classIcon1} />,
      dropDown: true,
      subTitle: [
        {
          title: "Airdrop",
          icon: <AiFillGift className={classIcon2} />,
        },
        {
          title: "News",
          // icon: <MdSwitchAccount className={classIcon2} />,
          icon: <MdSwitchAccount className={classIcon2} />,
        },
        {
          title: "Wallet",
          icon: <IoWallet className={classIcon2} />,
        },
      ],
    },
  ];
  const navItem2 = [
    {
      title: "Admin",
      icon: <GrUserAdmin className={classIcon1} />,
      dropDown: false,
    },
    {
      title: "User",
      icon: <RiFolderUserFill className={classIcon1} />,
      dropDown: false,
    },
    {
      title: "Activity",
      icon: <IoIosStats className={classIcon1} />,
      dropDown: false,
    },
    {
      title: "API",
      icon: <AiOutlineApi className={classIcon1} />,
      dropDown: false,
    },
    {
      title: "System",
      icon: <AiOutlineSetting className={classIcon1} />,
      dropDown: false,
    },
  ];
  return (
    <div className="nav__list">
      <NavItem title="MANAGE" navItem={navItem1} />
      <NavItem title="ADMIN" navItem={navItem2} />
    </div>
  );
};

export default NavList;
