import React from 'react'
import dayjs from 'dayjs'
import eventSvg from './undraw_events_re_98ue.svg';
import eventSvg2 from "./undraw_schedule_re_2vro.svg"
var calendar = require('dayjs/plugin/calendar')
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
dayjs.extend(calendar)

const EventList = ({ onGoing, eventList }) => {
  if (onGoing)
    eventList.sort(function (a, b) {
      var keyA = new Date(a.end),
        keyB = new Date(b.end);
      if (keyA < keyB) return 1;
      if (keyA > keyB) return -1;
      return 0;
    });
  else
    eventList.sort(function (a, b) {
      var keyA = new Date(a.start),
        keyB = new Date(b.start);
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
  return <div className='relative h-1/2'
  >
    <img src={onGoing ? eventSvg : eventSvg2} className="absolute opacity-20 bottom-0 right-0 object-cover h-60" draggable={false} alt="" />
    <div className='h-full shadow-lg rounded-lg bg-white dark:bg-gray-700 overflow-y-scroll overflow-x-hidden p-2'>

      <div className='py-2 px-5 text-xl font-semibold text-gray-600'>{onGoing ? "Ongoing events" : "Upcoming events"}</div>
      <ol
        className="relative border-l border-gray-200 dark:border-gray-700 translate-x-8 mr-12"
      >
        {eventList.map((e, i) => {
          console.log('### e :', e)
          return <EventItem event={e} onGoing={onGoing} />
        })}
      </ol>

    </div>
  </div >
}

const EventItem = ({ onGoing, event: { title, start, end, allDay, color, description } }) => {
  const eventColor = onGoing ? 'yellow' : 'blue'
  return <li className="mb-2 ml-6">
    <span className={`flex absolute -left-3 justify-center items-center w-6 h-6 bg-${eventColor}-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-${eventColor}-900`}>
      <svg
        className={`w-3 h-3 text-${eventColor}-600 dark:text-${eventColor}-400`}
        fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
    </span>
    <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white -translate-y-[2px]">{title}</h3>
    <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
      {onGoing ? "end " + dayjs(start).toNow() : "start " + dayjs(start).fromNow()}
    </time>
    <p className="text-base font-normal text-gray-500 dark:text-gray-400">{description}</p>
  </li>
}


export default EventList