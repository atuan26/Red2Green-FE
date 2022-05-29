import React, { memo, useCallback, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { FiClock } from "react-icons/fi"
import { GiSandsOfTime } from "react-icons/gi"
import eventSvg from './undraw_events_re_98ue.svg';
import eventSvg2 from "./undraw_schedule_re_2vro.svg"
import { usePrevious } from "./../../../hooks/index.js"
var calendar = require('dayjs/plugin/calendar')
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
dayjs.extend(calendar)

const EventList = (props) => {
  const { onGoing, eventList } = props
  const eventColor = onGoing ? 'yellow-400' : 'blue-500'
  let eventTypeList = []
  if (onGoing) {
    eventTypeList = eventList.filter(e => e.end > new Date() && e.start < new Date())
    eventTypeList.sort(function (a, b) {
      var keyA = new Date(a.end),
        keyB = new Date(b.end);
      if (keyA > keyB) return 1;
      if (keyA < keyB) return -1;
      return 0;
    })
  }
  else {
    eventTypeList = eventList.filter(e => e.start > new Date())
    eventTypeList.sort(function (a, b) {
      var keyA = new Date(a.start),
        keyB = new Date(b.start);
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
  }
  return <div className='relative h-1/2'
  >
    <div className='h-full shadow-lg rounded-lg bg-white dark:bg-gray-700 overflow-hidden p-2'>
      <div className='p-6 py-3'>
        <div
          className={`pl-2 mb-2 text-xl font-semibold text-gray-600 border-l-8 border-${eventColor} dark:border-${eventColor}`}
        >
          {onGoing ? "Ongoing events" : "Upcoming events"}
          {onGoing ?
            <span class="ml-2 bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">{eventTypeList.length}</span>
            :
            <span class="ml-2 bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">{eventTypeList.length}</span>
          }
        </div>
        {onGoing || <div className=' text-gray-500  '>Don't miss scheduled events</div>}
      </div>
      <div
        className="px-5 ml-2 max-h-[300px] overflow-x-visible overflow-y-auto "
      >
        {eventTypeList.map((e, i) => {
          return <EventItem key={i} event={e} onGoing={onGoing} />
        })}
      </div>

    </div>
    <img src={onGoing ? eventSvg : eventSvg2} className="absolute opacity-20 bottom-0 right-0 object-cover h-60 pointer-events-none" alt="" />
  </div >
}

const EventItem = ({ onGoing, event: { title, start, end, allDay, color, description } }) => {
  console.log('### rerender2 :',)
  const [relativeTime, setRelativeTime] = useState(onGoing ?
    <><GiSandsOfTime className='w-4 h-4' />end {dayjs(end).fromNow()}</>
    :
    <><FiClock className='w-4 h-4' />start {dayjs(start).fromNow()}</>
  )

  const eventColor = onGoing ? 'yellow' : 'blue'
  useEffect(() => {
    const relativeTimeInterval = setInterval(() => {
      setRelativeTime(onGoing ?
        <><GiSandsOfTime className='w-4 h-4' />end {dayjs(end).fromNow()}</>
        :
        <><FiClock className='w-4 h-4' />start {dayjs(start).fromNow()}</>
      )
    }, 60000);

    return () => {
      clearInterval(relativeTimeInterval)
    }
  }, [])
  return <div className="relative border-l border-gray-200 dark:border-gray-700 ">
    <span className={`flex absolute -left-3  justify-center items-center w-6 h-6 bg-${eventColor}-100 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-${eventColor}-900`}>
      <svg
        className={`w-3 h-3 text-${eventColor}-600 dark:text-${eventColor}-400`}
        fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
    </span>
    <h3 className="mb-1 ml-5 text-lg font-semibold text-gray-900 dark:text-white -translate-y-[2px]">{title}</h3>
    <time className="ml-5 mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500 flex items-center gap-2">
      {relativeTime}
    </time>
    <p className=" ml-5 text-base font-normal text-gray-500 dark:text-gray-400">{description}</p>
  </div>
}


export default memo(EventList)