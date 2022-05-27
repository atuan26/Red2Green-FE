import moment from 'moment';
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { BsCalendarDay, BsCalendarMonth, BsCalendarWeek } from 'react-icons/bs';
import { MdOutlineNavigateBefore, MdOutlineNavigateNext, MdOutlineToday, MdOutlineViewAgenda } from 'react-icons/md';
import { HiOutlineChevronDoubleLeft, HiOutlineChevronDoubleRight } from 'react-icons/hi';
import { usePrevious } from '../../../../Hook';
import { current } from 'daisyui/colors';


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
        color: '#333',
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

export const AgendaEvent = ({ event }) => {
  const eventEle = useRef()
  const color = (alpha = "ff") => event?.color ? event.color + alpha : "#1c64f2" + alpha
  useEffect(() => {
    eventEle.current.parentElement.style.backgroundColor = color('26')
    eventEle.current.parentElement.previousSibling.style.backgroundColor = color('26')
    eventEle.current.parentElement.previousSibling.style.border = "none"
    eventEle.current.parentElement.previousSibling.style.borderLeft = "3px solid " + color()
    eventEle.current.parentElement.previousSibling.style.color = "#777"
  }, [])
  return (
    <div
      ref={eventEle}
      className={`p-[2px] rounded-[4px]  h-full  `}
      style={{
        color: '#333',
      }}
    >
      {event.title}

    </div >
  );
};


export const RBCToolbar = (props) => {
  const [viewState, setViewState] = useState("month");
  const goToDayView = useCallback(() => {
    props.onView("day");
    setViewState("day");
  }, [])
  const goToWeekView = useCallback(() => {
    props.onView("week");
    setViewState("week");
  }, [])
  const goToMonthView = useCallback(() => {
    props.onView("month");
    setViewState("month");
  }, [])
  const goToAgendaView = useCallback(() => {
    props.onView("agenda");
    setViewState("agenda");
  }, [])

  const goToBack = useCallback(() => {
    let view = viewState;
    let mDate = props.date;
    let newDate;
    if (view === "month") {
      newDate = new Date(mDate.getFullYear(), mDate.getMonth() - 1, 1);
    } else if (view === "week") {
      newDate = new Date(
        mDate.getFullYear(),
        mDate.getMonth(),
        mDate.getDate() - 7,
        1
      );
    } else {
      newDate = new Date(
        mDate.getFullYear(),
        mDate.getMonth(),
        mDate.getDate() - 1,
        1
      );
    }
    props.onNavigate("prev", newDate);
  }, [])
  const goToNext = useCallback(() => {
    let view = viewState;
    let mDate = props.date;
    let newDate;
    if (view === "month") {
      newDate = new Date(mDate.getFullYear(), mDate.getMonth() + 1, 1);
    } else if (view === "week") {
      newDate = new Date(
        mDate.getFullYear(),
        mDate.getMonth(),
        mDate.getDate() + 7,
        1
      );
    } else {
      newDate = new Date(
        mDate.getFullYear(),
        mDate.getMonth(),
        mDate.getDate() + 1,
        1
      );
    }
    props.onNavigate("next", newDate);
  }, [])

  const goToToday = useCallback(() => {
    const now = new Date();
    props.date.setMonth(now.getMonth());
    props.date.setYear(now.getFullYear());
    props.date.setDate(now.getDate());
    props.onNavigate("current");
  }, [])

  const goToBackYear = useCallback(() => {
    let mDate = props.date;
    let newDate = new Date(mDate.getFullYear() - 1, mDate.getMonth());
    props.onNavigate("prev", newDate);
  }, [])

  const goToNextYear = useCallback(() => {
    let mDate = props.date;
    let newDate = new Date(mDate.getFullYear() + 1, mDate.getMonth());
    props.onNavigate("next", newDate);
  }, [])
  return (
    <div className="rbc-toolbar">
      <div className="mb-4 flex items-center justify-between w-full">
        <div className='flex gap-1'>
          <NavigateButton type={1} onClick={goToBackYear} />
          <NavigateButton type={2} onClick={goToBack} />
          <NavigateButton type={3} onClick={goToToday} />
          <NavigateButton type={4} onClick={goToNext} />
          <NavigateButton type={5} onClick={goToNextYear} />
        </div>
        <div className='text-2xl text-[#25396f] font-semibold'>
          {props.label}{' '}
          {("week" === viewState || 'day' === viewState) && moment(props.date).format(', YYYY')}
        </div>
        <div className="bg-[#1c64f226] rounded-md flex gap-2 p-1">
          <ButtonTabView
            type="month"
            isActive={"month" === viewState}
            onClick={goToMonthView}
          />
          <ButtonTabView
            type="week"
            isActive={"week" === viewState}
            onClick={goToWeekView}
          />
          <ButtonTabView
            type="day"
            isActive={"day" === viewState}
            onClick={goToDayView}
          />
          <ButtonTabView
            type="agenda"
            isActive={"agenda" === viewState}
            onClick={goToAgendaView}
          />
        </div>
      </div>
    </div>
  );
}

const ButtonTabView = memo(({ type, onClick, isActive }) => {

  const btnIcon = useMemo(() => ({
    'month': <BsCalendarMonth className='w-4 h-4' />,
    'week': <BsCalendarWeek className='w-4 h-4' />,
    'day': <BsCalendarDay className='w-4 h-4' />,
    'agenda': <MdOutlineViewAgenda className='w-4 h-4' />,
  }))
  const currentViewButtonClass = "btn btn-sm capitalize !border-transparent !bg-[#1c64f2] text-white !px-4 !py-1 !rounded-md hover:opacity-90"
  const otherButtonClass = "capitalize cursor-pointer bg-transparent text-[#1c64f2] px-4 py-1 rounded-md hover:opacity-90"
  return (
    <div
      className={isActive ? currentViewButtonClass : otherButtonClass}
      onClick={onClick}
    >
      <span className="">
        <div className='flex items-center gap-2 '>{btnIcon[type]}{type}</div>
      </span>
    </div>)
})

const NavigateButton = memo(({ type, onClick }) => {
  const btnIcon = useMemo(() => ({
    1: <HiOutlineChevronDoubleLeft className='w-4 h-4' />,
    2: <MdOutlineNavigateBefore className='w-4 h-4' />,
    3: <MdOutlineToday className='w-4 h-4' />,
    4: <MdOutlineNavigateNext className='w-4 h-4' />,
    5: <HiOutlineChevronDoubleRight className='w-4 h-4' />,
  }))
  return (
    <button
      className="btn  btn-sm flex items-center gap-2 bg-white text-[#1c64f2] !rounded-md border-[1px] border-gray-200 hover:!bg-[#1c64f2] hover:!text-white hover:!border-white hover:!rounded-md focus:!ring-2 focus:!ring-[#1c64f262]"
      onClick={onClick}>
      {btnIcon[type]}
    </button>
  )
})