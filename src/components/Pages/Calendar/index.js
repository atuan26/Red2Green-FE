import React, { useCallback, useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css"
import { connect } from "react-redux";
import { loadEvent } from '../../../redux/actions/eventAction';

import EventModal from "../../Other/Modal/EventModal";
import EventList from './EventList';
import { AgendaEvent, MonthEvent, RBCToolbar, WeekEvent, WeekHeader } from './RBCCustomComponent';


const localizer = momentLocalizer(moment);

const MyCalendar = ({ eventList, isAuthenticated, loadEvent }) => {
  const [showEventModal, setShowEventModal] = useState(false);
  const [initialValues, setInitialValues] = useState({});


  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      setInitialValues({ start, end })
      setShowEventModal(true)
    },
    []
  )

  const handleDoubleClickEvent = useCallback(
    (event) => {
      setInitialValues(event)
      setShowEventModal(true)
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
      <div className=" grid grid-cols-4 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        <div className="col-span-4 z-base  xl:col-span-3">
          <div className='relative shadow-lg rounded-2xl bg-white dark:bg-gray-700'>
            <button
              className='fixed btn btn-circle bg-[#1c64f2] border-0 hover:bg-[#1c64f2dd] bottom-20 right-20 z-20'
              onClick={() => setShowEventModal(true)}
            >
              +
            </button>
            <Calendar
              localizer={localizer}
              defaultView={"month"}
              events={eventList}
              startAccessor="start"
              endAccessor="end"
              popup
              components={{
                month: { event: MonthEvent },
                week: {
                  event: WeekEvent,
                  header: WeekHeader
                },
                day: {
                  event: WeekEvent
                },
                agenda: {
                  event: AgendaEvent
                },
                toolbar: RBCToolbar
                // event: MonthEvent
              }}
              onDoubleClickEvent={handleDoubleClickEvent}
              onSelectSlot={handleSelectSlot}

              selectable
              style={{ height: 800, padding: 24 }}
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
