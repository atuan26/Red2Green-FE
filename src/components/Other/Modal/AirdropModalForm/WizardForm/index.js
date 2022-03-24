import React, { Component, useState } from 'react'
import WizardFormFirstPage from './FirstPage'
import WizardFormSecondPage from './SecondPage'
import WizardFormThirdPage from './ThirdPage'
import WizardFormFourthPage from './FourthPage'
import { FaRegCalendarAlt, FaSearchDollar, FaTasks } from 'react-icons/fa'
import { AiOutlineProfile } from 'react-icons/ai'


const WizardForm2 = () => {
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
      <StepForm currentPage={currentPage} pageList={pageList} />
      {/* <div class="pl-8 text-sm breadcrumbs">
        <ul>
          <li>
            <a>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-2 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
              Information
            </a>
          </li>
          <li>
            <a>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-2 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
              Time
            </a>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-2 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            Social
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-2 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            Task
          </li>
        </ul>
      </div> */}
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
          onSubmit={(values) => console.log('Form value:', JSON.stringify(values))}
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
const StepCom = ({ name, icon, position }) => {
  let className = []
  switch (position) {
    case 1:
      className = ["flex items-center text-gray-500 relative", "rounded-full transition duration-500 ease-in-out h-6 w-6 box-content p-1 border-[1px] border-gray-300"]
      break;
    case 0:
      className = ["flex items-center text-white relative", "rounded-full transition duration-500 ease-in-out h-6 w-6 box-content p-1 border-[1px] bg-blue-500 border-blue-500"]
      break
    case -1:
      className = ["flex items-center text-blue-500 relative", "rounded-full transition duration-500 ease-in-out h-6 w-6 box-content p-1 border-[1px] border-blue-500"]
      break
    default:
      break;
  }
  return <div className={className[0]}>
    <div className={className[1]}>
      {icon}
    </div>
    <div className="absolute top-0 -left-12 text-center mt-12 w-32 text-xs font-medium uppercase text-blue-500">{name}</div>
  </div>
}
const StepForm = ({ currentPage, pageList }) => {
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
          <StepCom name={page.name} icon={page.icon} position={pt} />
          {i !== pageList.length - 1 && <Divider active={currentPage > i} />}
        </>
      })}
      {/* <div className="flex items-center text-blue-500 relative">
        <div className="rounded-full transition duration-500 ease-in-out h-6 w-6 box-content p-1 border-[1px] border-blue-500">
          <AiOutlineProfile className='w-full h-full' />
        </div>
        <div className="absolute top-0 -left-12 text-center mt-12 w-32 text-xs font-medium uppercase text-blue-500">Information</div>
      </div>
      <Divider active={true} />
      <div className="flex items-center text-white relative">
        <div className="rounded-full transition duration-500 ease-in-out h-6 w-6 box-content p-1 border-[1px] bg-blue-500 border-blue-500">
          <FaRegCalendarAlt className='w-full h-full' />
        </div>
        <div className="absolute top-0 -left-12 text-center mt-12 w-32 text-xs font-medium uppercase text-blue-500">Time</div>
      </div>
      <Divider active={false} />
      <div className="flex items-center text-gray-500 relative">
        <div className="rounded-full transition duration-500 ease-in-out h-6 w-6 box-content p-1 border-[1px] border-gray-300">
          <FaSearchDollar className='w-full h-full' />
        </div>
        <div className="absolute top-0 -left-12 text-center mt-12 w-32 text-xs font-medium uppercase text-gray-500">Project Info</div>
      </div>
      <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"></div>
      <div className="flex items-center text-gray-500 relative">
        <div className="rounded-full transition duration-500 ease-in-out h-6 w-6 box-content p-1 border-[1px] border-gray-300">
          <FaTasks className='w-full h-full' />
        </div>
        <div className="absolute top-0 -left-12 text-center mt-12 w-32 text-xs font-medium uppercase text-gray-500">Task</div>
      </div> */}
    </div>
  </div>
}
export default WizardForm2