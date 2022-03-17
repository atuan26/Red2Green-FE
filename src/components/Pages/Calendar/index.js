import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
// import "./Calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { connect } from "react-redux";

const localizer = momentLocalizer(moment);

const MyCalendar = ({ eventList }) => {
  return (
    <div className="min-h-screen">
      <Calendar
        localizer={localizer}
        defaultView={"month"}
        events={eventList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  eventList: state.event || [],
});

export default connect(mapStateToProps, null)(MyCalendar);
