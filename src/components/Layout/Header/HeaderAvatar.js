import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const HeaderAvatar = ({ username, logout }) => {
  const [showUser, setShowUser] = useState(false);
  return (
    <>
      <button
        onClick={() => setShowUser(!showUser)}
        type="button"
        className="relative flex items-center"
      >
        <FaRegUserCircle className="nav__icon w-[50px] h-[50px] mr-2" />
        <span className="text-lg">{username}</span>
        {showUser && (
          <div
            onBlur={() => setShowUser(false)}
            className="absolute right-0 top-[100%] z-10 !mt-4 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
          >
            <ul className="py-1">
              <LiUser title="Dashboard" href="#" />
              <LiUser title="Setting" href="#" />
              <LiUser title="Earning" href="#" />
            </ul>
            <div
              className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              title="Logout"
              href="#"
              onClick={logout}
            >
              Logout
            </div>
          </div>
        )}
      </button>
    </>
  );
};

const LiUser = ({ title, href, ...props }) => {
  return (
    <div>
      <Link
        to={href}
        className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
        {...props}
      >
        {title}
      </Link>
    </div>
  );
};

export default HeaderAvatar;
