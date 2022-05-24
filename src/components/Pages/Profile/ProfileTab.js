import { useState } from "react"
import { BiPlug, BiUser } from "react-icons/bi"
import { MdOutlineDashboard, MdOutlineSettings } from "react-icons/md"
import { RiContactsLine } from "react-icons/ri"
import { Contacts, Dashboard, ExchangeAPI, Profile, Settings } from "./ProfileTabList"

const ProfileTab = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const classNameIcon = 'w-5 h-5 inline mr-2'
  const tabList = [
    {
      label: 'Profile',
      icon: <BiUser className={classNameIcon} />,
      disable: false,
      component: <Profile />
    },
    {
      label: 'Dashboard',
      icon: <MdOutlineDashboard className={classNameIcon} />,
      disable: false,
      component: <Dashboard />
    },
    {
      label: 'Exchange API',
      icon: <BiPlug className={classNameIcon} />,
      disable: false,
      component: <ExchangeAPI />
    },
    {
      label: 'Contacts',
      icon: <RiContactsLine className={classNameIcon} />,
      disable: true,
      component: <Contacts />
    },
    {
      label: 'Settings',
      icon: <MdOutlineSettings className={classNameIcon} />,
      disable: true,
      component: <Settings />
    },
  ]
  return <>

    <div className="bg-white p-3 shadow-sm rounded-lg">
      <div className="mb-4 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 ">
        <ul className="flex flex-wrap -mb-px">
          {tabList.map((tab, i) => (
            <ProfileTabItem
              key={i}
              currentTab={i === currentTab}
              onClick={() => { if (!tab.disable) setCurrentTab(i); }}
              {...tab}
            />)
          )
          }
        </ul>
      </div>
      {tabList.map((tab, i) => <span key={i}>{currentTab === i ? tab.component : null}</span>)}
    </div>
  </>
}

const ProfileTabItem = ({ label, icon, currentTab, disable, ...props }) => {
  const classNameItem = disable ? "inline-block p-4 rounded-t-lg border-b-2 border-transparent text-gray-400  cursor-not-allowed  dark:text-gray-500" : !currentTab ? "inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" : " inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500"
  return <li className="mr-2">
    <a
      href="# "
      className={classNameItem}
      {...props}
      onClick={props.onClick}
    >
      {icon}
      {label}
    </a>
  </li >
}

export default ProfileTab