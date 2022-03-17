import React, { useState } from "react";
import Calendar from "react-calendar";
import "./Calendar.css";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { AddEventBtn, EventDot, EventItem } from "./EventComponent";
import { connect } from "react-redux";
import EventModal from "../../Other/Modal/EventModal";

const CalendarEvent = ({ eventList }) => {
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedDay, onChange] = useState(new Date());
  const [initialValues, setInitialValues] = useState({});
  const getDayEvent = (day, list = []) => {
    let dayEvent = [];
    for (const event of list) {
      let eventDay = new Date(event.start).setHours(0, 0, 0, 0);
      if (day.setHours(0, 0, 0, 0) === eventDay) {
        dayEvent.push(event);
      }
    }
    return dayEvent;
  };
  const dayEvent = getDayEvent(selectedDay, eventList);

  return (
    <>
      <div className="col-span-2  shadow-lg stats">
        <Calendar
          onChange={onChange}
          value={selectedDay}
          formatDay={(locale, date) => date.getDate().toString()}
          locale="en"
          nextLabel={
            <GrFormNext className="text-white rounded-full  w-8 h-8 " />
          }
          prevLabel={
            <GrFormPrevious className="text-white rounded-full w-8 h-8 " />
          }
          next2Label={null}
          prev2Label={null}
          minDetail="decade"
          showNeighboringMonth={false}
          tileContent={({ activeStartDate, date, view }) => {
            if (view === "month") {
              let colorEventList = getDayEvent(date, eventList);
              return colorEventList.length ? (
                <EventDot color={colorEventList} />
              ) : null;
            }
          }}
        />
      </div>

      <div className=" max-h-[550px] overflow-auto shadow-lg rounded-xl w-full p-4 bg-white dark:bg-gray-800 relative no-scrollbar">
        <div className="w-full flex items-center justify-between mb-4">
          <p className="text-gray-800 dark:text-white text-xl font-medium">
            {selectedDay.getDate() +
              "." +
              (selectedDay.getMonth() + 1) +
              "." +
              selectedDay.getFullYear()}
          </p>
          <AddEventBtn
            onClick={() => {
              setShowEventModal(true);
              setInitialValues({ start: selectedDay });
            }}
          />
        </div>
        {dayEvent.length === 0 && (
          <p className="text-gray-500 text-xl">No event</p>
        )}
        {dayEvent.map((e, i) => (
          <EventItem
            key={i}
            title={e.title}
            start={e.start}
            end={e.end}
            color={e.color}
            onDoubleClick={() => {
              setShowEventModal(true);
              setInitialValues({
                ...e,
                start: new Date(e.start),
                end: new Date(e.end),
              });
            }}
          />
        ))}
      </div>
      {showEventModal && (
        <EventModal
          initialValues={initialValues}
          close={() => setShowEventModal(false)}
        />
      )}
    </>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  eventList: state.event || [],
});

export default connect(mapStateToProps, null)(CalendarEvent);
