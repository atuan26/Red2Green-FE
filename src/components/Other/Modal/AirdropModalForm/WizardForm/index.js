import React, { Component, useState } from 'react'
import WizardFormFirstPage from './FirstPage'
import WizardFormSecondPage from './SecondPage'
import WizardFormThirdPage from './ThirdPage'
import WizardFormFourthPage from './FourthPage'
import { FaRegCalendarAlt, FaSearchDollar, FaTasks } from 'react-icons/fa'
import { AiOutlineProfile } from 'react-icons/ai'
import { addAirdrop } from '../../../../../redux/actions/airdropAction'


const WizardForm = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageList = [
    {
      name: 'Information',
      icon: <AiOutlineProfile className='w-full h-full' />
    },
    {
      name: 'Time',
      icon: <FaRegCalendarAlt className='w-full h-full' />
    },
    {
      name: 'Project Info',
      icon: <FaSearchDollar className='w-full h-full' />
    },
    {
      name: 'Task',
      icon: <FaTasks className='w-full h-full' />
    },
  ]
  return (
    <div>
      <StepForm currentPage={currentPage} pageList={pageList} setCurrentPage={setCurrentPage} />
      {currentPage === 1 && <WizardFormFirstPage onSubmit={() => setCurrentPage(currentPage => currentPage + 1)} />}
      {currentPage === 2 && (
        <WizardFormSecondPage
          previousPage={() => setCurrentPage(currentPage => currentPage - 1)}
          onSubmit={() => setCurrentPage(currentPage => currentPage + 1)}
        />
      )}
      {currentPage === 3 && (
        <WizardFormThirdPage
          previousPage={() => setCurrentPage(currentPage => currentPage - 1)}
          onSubmit={() => setCurrentPage(currentPage => currentPage + 1)}
        />
      )}
      {currentPage === 4 && (
        <WizardFormFourthPage
          previousPage={() => setCurrentPage(currentPage => currentPage - 1)}
          onSubmit={addAirdrop}
        />
      )}
    </div>
  )
}

const Divider = ({ active }) => (<div
  className={active ?
    "flex-auto border-t-2 transition duration-500 ease-in-out border-blue-500 " :
    "flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"
  }
/>
)
const StepCom = ({ name, icon, position, onClick }) => {
  let className = []
  switch (position) {
    case 1:
      className = ["flex items-center text-gray-500 relative", "rounded-full transition duration-500 cursor-pointer ease-in-out h-6 w-6 box-content p-1 border-[1px] border-gray-300"]
      break;
    case 0:
      className = ["flex items-center text-white relative", "rounded-full transition duration-500 cursor-pointer ease-in-out h-6 w-6 box-content p-1 border-[1px] bg-blue-500 border-blue-500"]
      break
    case -1:
      className = ["flex items-center text-blue-500 relative", "rounded-full transition duration-500 cursor-pointer  ease-in-out h-6 w-6 box-content p-1 border-[1px] border-blue-500"]
      break
    default:
      break;
  }
  return <div className={className[0]}>
    <div className={className[1]} onClick={onClick}>
      {icon}
    </div>
    <div className="absolute top-0 -left-12 text-center mt-12 w-32 text-xs font-medium uppercase text-blue-500">{name}</div>
  </div>
}
const StepForm = ({ currentPage, pageList, setCurrentPage }) => {
  const position = {
    PRE_ACTIVE: -1,
    ACTIVE: 0,
    NOT_ACTIVE: 1
  }
  return <div className="mx-4 mb-8 p-4">
    <div className="flex items-center">
      {pageList.map((page, i) => {
        let pt = position.ACTIVE
        if (currentPage - i - 1 > 0) pt = position.PRE_ACTIVE
        else if (currentPage - i - 1 < 0) pt = position.NOT_ACTIVE
        return <>
          <StepCom name={page.name} key={i} icon={page.icon}
            position={pt}
            onClick={() => (currentPage > i) && setCurrentPage(i + 1)} />
          {i !== pageList.length - 1 && <Divider active={currentPage - 1 > i} />}
        </>
      })}
    </div>
  </div>
}
export default WizardForm