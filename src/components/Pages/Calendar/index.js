import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext, MdOutlineToday, MdOutlineViewAgenda } from "react-icons/md"
import { BsCalendarDay, BsCalendarMonth, BsCalendarWeek } from "react-icons/bs"
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css"
import { connect } from "react-redux";
import { loadEvent } from '../../../redux/actions/eventAction';

import EventModal from "../../Other/Modal/EventModal";
import { invertColor } from '../../../ultils/convertColor';
import EventList from './EventList';
import { MonthEvent, WeekEvent } from './RBCCustomComponent';


const localizer = momentLocalizer(moment);

const MyCalendar = ({ eventList, isAuthenticated, loadEvent }) => {
  const [showEventModal, setShowEventModal] = useState(false);
  const [initialValues, setInitialValues] = useState({});


  const eventPropGetter = useCallback(
    (event, start, end, isSelected) => {
      if (!event.color) {
        var style = {
          backgroundColor: "#1c64f2",
          color: "#fff",
        };
        return {
          style: style
        };

      }
      else {
        var style = {
          backgroundColor: event.color,
          color: invertColor(event.color, 1),
        };

        return {
          style: style
        };
      }
    },
    []
  )

  const slotPropGetter = useCallback(
    (date) => ({
      className: ' ',
    }),
    []
  )
  const { messages } = useMemo(
    () => ({
      messages: {
        day: <div className='flex items-center gap-2'><BsCalendarDay className='w-4 h-4' />Day</div>,
        week: <div className='flex items-center gap-2'><BsCalendarWeek className='w-4 h-4' />Week</div>,
        month: <div className='flex items-center gap-2'><BsCalendarMonth className='w-4 h-4' />Month</div>,
        next: <div className='flex items-center gap-2'><MdOutlineNavigateNext className='w-[18px] h-[18px]' /></div>,
        previous: <div className='flex items-center gap-2'><MdOutlineNavigateBefore className='w-[18px] h-[18px]' /></div>,
        today: <div className='flex items-center gap-2'><MdOutlineToday className='w-4 h-4' />Today</div>,
        agenda: <div className='flex items-center gap-2'><MdOutlineViewAgenda className='w-4 h-4' />Agenda</div>,

        showMore: (total) => `+${total} more`,
      },
    }),
    []
  )

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      setInitialValues({ start, end })
      setShowEventModal(true)
    },
    []
  )

  const handleSelectEvent = useCallback(
    (event) => {
      console.log('### event :', event)
      window.alert(event.title);
    },
    []
  )


  useEffect(() => {
    if (isAuthenticated) {
      loadEvent();
    }
  }, [isAuthenticated, loadEvent]);
  return (
    <div className=" min-h-screen">
      {showEventModal && (
        <EventModal
          initialValues={initialValues}
          close={() => setShowEventModal(false)}
        />
      )}
      <div className="grid grid-cols-4 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        <div className="col-span-4 z-base  xl:col-span-3">
          <div className=' shadow-lg rounded-2xl bg-white dark:bg-gray-700'>
            <Calendar
              localizer={localizer}
              defaultView={"month"}
              events={eventList}
              startAccessor="start"
              endAccessor="end"
              popup
              // slotPropGetter={slotPropGetter}
              components={{
                month: { event: MonthEvent },
                // week: { event: WeekEvent },
                // event: MonthEvent
              }}
              // eventPropGetter={eventPropGetter}

              onDoubleClickEvent={handleSelectEvent}
              onSelectSlot={handleSelectSlot}

              selectable
              style={{ height: 800, padding: 24 }}
              messages={messages}
            />
          </div>
        </div>
        <div className="col-span-4 xl:col-span-1 h-full w-[99%]  flex flex-col gap-4">
          <EventList onGoing={true} eventList={eventList.filter(e => e.end > new Date() && e.start < new Date())} />
          <EventList onGoing={false} eventList={eventList.filter(e => e.start > new Date())} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  eventList: state.event || [],
});

const mapDispatchtoProps = (dispatch) => ({
  loadEvent: () => dispatch(loadEvent()),
});
export default connect(mapStateToProps, mapDispatchtoProps)(MyCalendar);
