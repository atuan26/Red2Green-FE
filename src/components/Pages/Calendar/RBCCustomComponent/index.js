import moment from 'moment';
import React, { useEffect, useRef } from 'react'

export const MonthEvent = ({ event }) => {
  const color = (alpha = "ff") => event?.color ? event.color + alpha : "#1c64f2" + alpha
  return (
    <div
      className={`py-[1px] px-2 mb-0.5 rounded-[3px] hover:!bg-gray-200`}
      style={{
        backgroundColor: color('26'),
        color: '#777',
        borderLeft: `5px solid ${color()}`
      }}
    >{moment(event.start).format('H:mm ')}
      <strong className='text-gray-600'>{event.title}</strong>

    </div >
  );
};
export const WeekEvent = ({ event }) => {
  const eventEle = useRef()
  const color = (alpha = "ff") => event?.color ? event.color + alpha : "#1c64f2" + alpha
  useEffect(() => {
    eventEle.current.parentElement.parentElement.style.backgroundColor = color('26')
    eventEle.current.parentElement.parentElement.style.border = "none"
    eventEle.current.parentElement.parentElement.style.borderLeft = "3px solid " + color()
    eventEle.current.parentElement.parentElement.style.color = "#777"
  }, [])
  return (
    <div
      ref={eventEle}
      className={`p-[2px] rounded-[4px]  h-full  `}
      style={{
        // backgroundColor: event?.color ? event.color + "40" : "#1c64f250",
        color: '#333',
        //   borderLeft: `8px solid ${event?.color || "#1c64f2"}`
      }}
    >
      {event.title}

    </div >
  );
};

export const WeekHeader = ({ date, label }) => {
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const dayWeek = weekday[date.getDay()].slice(0, 3);
  const dayMonth = date.getDate()
  return (
    <div
      className='font-normal '
    >
      {dayWeek}{' '}
      <strong>
        {dayMonth}
      </strong>
    </div >
  );
};
