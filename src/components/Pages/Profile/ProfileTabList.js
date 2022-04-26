import React from 'react'

export const Profile = () => {
  return <div className="text-gray-700">
    <div className="grid md:grid-cols-2 text-sm">
      <div className="grid grid-cols-2">
        <div className="px-4 py-2 font-semibold">First Name</div>
        <div className="px-4 py-2">Jane</div>
      </div>
      <div className="grid grid-cols-2">
        <div className="px-4 py-2 font-semibold">Last Name</div>
        <div className="px-4 py-2">Doe</div>
      </div>
      <div className="grid grid-cols-2">
        <div className="px-4 py-2 font-semibold">Gender</div>
        <div className="px-4 py-2">Female</div>
      </div>
      <div className="grid grid-cols-2">
        <div className="px-4 py-2 font-semibold">Contact No.</div>
        <div className="px-4 py-2">+11 998001001</div>
      </div>
      <div className="grid grid-cols-2">
        <div className="px-4 py-2 font-semibold">Current Address</div>
        <div className="px-4 py-2">Beech Creek, PA, Pennsylvania</div>
      </div>
      <div className="grid grid-cols-2">
        <div className="px-4 py-2 font-semibold">Permanant Address</div>
        <div className="px-4 py-2">Arlington Heights, IL, Illinois</div>
      </div>
      <div className="grid grid-cols-2">
        <div className="px-4 py-2 font-semibold">Email.</div>
        <div className="px-4 py-2">
          <a className="text-blue-800" href="mailto:jane@example.com">jane@example.com</a>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="px-4 py-2 font-semibold">Birthday</div>
        <div className="px-4 py-2">Feb 06, 1998</div>
      </div>
    </div>
  </div>
}

export const Dashboard = () => {
  return <div>Dashboard</div>
}

export const Contacts = () => {
  return <div>Contacts</div>
}

export const ExchangeAPI = () => {
  return <div>ExchangeAPI</div>
}

export const Settings = () => {
  return <div>Settings</div>
}
