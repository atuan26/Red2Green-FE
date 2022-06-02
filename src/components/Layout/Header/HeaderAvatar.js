import React from "react";
import { HiOutlineUserAdd } from "react-icons/hi";
import { IoLogOutOutline } from "react-icons/io5";
import { MdHelpOutline } from "react-icons/md";
import { RiSettings5Line, RiTeamLine } from "react-icons/ri";
import { CgOrganisation } from "react-icons/cg";
import { BiUser } from "react-icons/bi";
// import { RiTeamLine } from "react-icons/ri"
import { Link } from "react-router-dom";
import { useComponentVisible } from "../../../ultils/hooks";

const HeaderAvatar = ({ username, logout }) => {
  const classNameIcon = "w-5 h-5 mx-1";
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  return (
    <>
      <NotifyIcon />
      <div className="relative inline-block ml-4 " ref={ref}>
        <button
          onClick={() => setIsComponentVisible(!isComponentVisible)}
          className="relative z-10 flex items-center p-2 text-sm text-gray-600 bg-white border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:text-white dark:bg-gray-800 focus:outline-none hover:bg-gray-50"
        >
          <span className="mx-1">Jane Doe</span>
          <svg
            className="w-5 h-5 mx-1"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
        {isComponentVisible && (
          <div className=" hover:shadow border  absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden bg-white rounded-md  dark:bg-gray-800">
            <a
              href="# "
              className="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <img
                className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9"
                src="https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d29tYW4lMjBibHVlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=face&w=500&q=200"
                alt="jane avatar"
              />
              <div className="mx-1">
                <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Jane Doe
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  janedoe@exampl.com
                </p>
              </div>
            </a>

            <hr className="border-gray-200 dark:border-gray-700 " />
            <HeaderAvatarItem
              label="View Profile"
              link="r2g/profile"
              icon={<BiUser className={classNameIcon} />}
            />
            <HeaderAvatarItem
              label="Settings"
              icon={<RiSettings5Line className={classNameIcon} />}
            />
            <hr className="border-gray-200 dark:border-gray-700 " />
            <HeaderAvatarItem
              label="Company"
              icon={<CgOrganisation className={classNameIcon} />}
            />
            <HeaderAvatarItem
              label="Team"
              icon={<RiTeamLine className={classNameIcon} />}
            />
            <HeaderAvatarItem
              label="Invite friends"
              icon={<HiOutlineUserAdd className={classNameIcon} />}
            />
            <hr className="border-gray-200 dark:border-gray-700 " />
            <HeaderAvatarItem
              label="Help"
              icon={<MdHelpOutline className={classNameIcon} />}
            />
            <HeaderAvatarItem
              label="Logout"
              icon={<IoLogOutOutline className={classNameIcon} />}
              onClick={logout}
            />
          </div>
        )}
      </div>
    </>
  );
};

const HeaderAvatarItem = ({ label, link, icon, ...props }) => {
  return (
    <>
      <Link
        to={link || "#"}
        className="flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
        {...props}
      >
        {icon}
        <span className="mx-1">{label}</span>
      </Link>
    </>
  );
};

const NotifyIcon = () => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  return (
    <>
      <div ref={ref} className="flex items-center justify-center ">
        <div className="relative inline-block">
          <button
            onClick={() => setIsComponentVisible(!isComponentVisible)}
            className="hover:bg-gray-50 relative z-10 block p-2 text-gray-700 bg-white border border-transparent rounded-md dark:text-white focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:bg-gray-800 focus:outline-none"
          >
            <svg
              className="w-5 h-5 text-gray-800 dark:text-white"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C10.8954 22 10 21.1046 10 20H14C14 21.1046 13.1046 22 12 22ZM20 19H4V17L6 16V10.5C6 7.038 7.421 4.793 10 4.18V2H13C12.3479 2.86394 11.9967 3.91762 12 5C12 5.25138 12.0187 5.50241 12.056 5.751H12C10.7799 5.67197 9.60301 6.21765 8.875 7.2C8.25255 8.18456 7.94714 9.33638 8 10.5V17H16V10.5C16 10.289 15.993 10.086 15.979 9.9C16.6405 10.0366 17.3226 10.039 17.985 9.907C17.996 10.118 18 10.319 18 10.507V16L20 17V19ZM17 8C16.3958 8.00073 15.8055 7.81839 15.307 7.477C14.1288 6.67158 13.6811 5.14761 14.2365 3.8329C14.7919 2.5182 16.1966 1.77678 17.5954 2.06004C18.9942 2.34329 19.9998 3.5728 20 5C20 6.65685 18.6569 8 17 8Z"
                fill="#2E3A59"
              ></path>
            </svg>
          </button>
          {isComponentVisible && (
            <div className="absolute right-0 z-20 mt-2 overflow-hidden bg-gray-100 rounded-md shadow-lg w-80 dark:bg-gray-800">
              <div className="py-2">
                <a
                  href="# "
                  className="flex items-center px-4 py-3 -mx-2 transition-colors duration-200 transform border-b border-gray-100 hover:bg-white dark:hover:bg-gray-700 dark:border-gray-700"
                >
                  <img
                    className="flex-shrink-0 object-cover w-8 h-8 mx-1 rounded-full"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                    alt="avatar"
                  />
                  <p className="mx-2 text-sm text-gray-600 dark:text-white">
                    <span className="font-bold" href="# ">
                      Sara Salah
                    </span>{" "}
                    replied on the{" "}
                    <span className="font-bold text-blue-500" href="# ">
                      Upload Image
                    </span>{" "}
                    artical . 2m
                  </p>
                </a>
                <a
                  href="# "
                  className="flex items-center px-4 py-3 -mx-2 transition-colors duration-200 transform border-b  border-gray-100 hover:bg-white dark:hover:bg-gray-700 dark:border-gray-700"
                >
                  <img
                    className="flex-shrink-0 object-cover w-8 h-8 mx-1 rounded-full"
                    src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                    alt="avatar"
                  />
                  <p className="mx-2 text-sm text-gray-600 dark:text-white">
                    <span className="font-bold" href="# ">
                      Slick Net
                    </span>{" "}
                    start following you . 45m
                  </p>
                </a>
                <a
                  href="# "
                  className="flex items-center px-4 py-3 -mx-2 transition-colors duration-200 transform border-b border-gray-100 hover:bg-white dark:hover:bg-gray-700 dark:border-gray-700"
                >
                  <img
                    className="flex-shrink-0 object-cover w-8 h-8 mx-1 rounded-full"
                    src="https://images.unsplash.com/photo-1450297350677-623de575f31c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                    alt="avatar"
                  />
                  <p className="mx-2 text-sm text-gray-600 dark:text-white">
                    <span className="font-bold" href="# ">
                      Jane Doe
                    </span>{" "}
                    Like Your reply on{" "}
                    <span className="font-bold text-blue-500" href="# ">
                      Test with TDD
                    </span>{" "}
                    artical . 1h
                  </p>
                </a>
                <a
                  href="# "
                  className="flex items-center px-4 py-3 -mx-2 transition-colors duration-200 transform hover:bg-white dark:hover:bg-gray-700"
                >
                  <img
                    className="flex-shrink-0 object-cover w-8 h-8 mx-1 rounded-full"
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=398&q=80"
                    alt="avatar"
                  />
                  <p className="mx-2 text-sm text-gray-600 dark:text-white">
                    <span className="font-bold" href="# ">
                      Abigail Bennett
                    </span>{" "}
                    start following you . 3h
                  </p>
                </a>
              </div>
              <a
                href="# "
                className="block py-2 font-bold text-center text-white bg-gray-800 dark:bg-gray-700 hover:underline"
              >
                See all notifications
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HeaderAvatar;
