import moment from 'moment';
import React from 'react'

export const MonthEvent = ({ event }) => {
  return (
    <div
      className={`p-[2px] rounded-[4px] hover:!bg-gray-200`}
      style={{
        backgroundColor: event?.color ? event.color + "40" : "#1c64f250",
        color: '#333',
        borderLeft: `8px solid ${event?.color || "#1c64f2"}`
      }}
    >
      <strong>{moment(event.start).format('ha')}</strong> {event.title}

    </div >
  );
};
export const WeekEvent = ({ event }) => {
  return (
    <div
      className={`p-[2px] rounded-[4px] hover:!bg-gray-200`}
      style={{
        backgroundColor: event?.color ? event.color + "40" : "#1c64f250",
        color: '#333',
        borderLeft: `8px solid ${event?.color || "#1c64f2"}`
      }}
    >
      {/* {event.allDay
        ?
        <></>
        // <div className='font-semibold'>{moment(event.start).format('H:mm')} – {moment(event.end).format('H:mm')}</div>
        :
        <div className='font-semibold'>{moment(event.start).format('H:mm')} – {moment(event.end).format('H:mm')}</div>} */}
      {event.title}

    </div >
    // <div title="1:00 AM – 3:00 AM: test3" class="rbc-event" >
    //   <div class="rbc-event-label">1:00 AM – 3:00 AM</div>
    //   <div class="rbc-event-content">test3</div>
    // </div>
  );
};
