import React, { useState } from "react";
import { AiFillStar, AiOutlineStar, AiOutlineCalendar } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import { BsTrash, BsThreeDotsVertical } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { FiClock } from "react-icons/fi";
import { CgDetailsMore } from "react-icons/cg";
import { GoLocation } from "react-icons/go";
import moment from "moment";
import { showComfirmModal } from "../../../redux/actions/notiAction";

const EventDetailPopup = ({
  data: {
    event: { id, title, start, end, allDay, color, description },
    rect,
    editEvent,
    deleteEvent,
    close,
  },
  ...props
}) => {
  const [star, setStar] = useState(false);

  const stylePos = { left: rect.relative.left };
  if (rect.window.height - rect.bottom > 300)
    stylePos.top = rect.relative.top + rect.height + 2;
  else stylePos.bottom = -rect.relative.bottom + (rect.height + 2);

  return (
    <div
      className="absolute bg-white rounded-md z-10 border border-gray-100 shadow-md p-2 md:w-72 xl:w-96"
      style={stylePos}
      {...props}
    >
      {/* Toolbar */}
      <div className="w-full flex justify-end gap-2 ">
        <button
          onClick={editEvent}
          className="btn btn-sm btn-circle border-0 bg-white hover:bg-gray-200 text-gray-600"
        >
          <BiPencil className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            showComfirmModal({
              active: true,
              message: { label: "Do you want to delete this event?" },
              onConfirm: deleteEvent,
            });
            close();
          }}
          className="btn btn-sm btn-circle border-0 bg-white hover:bg-gray-200 text-gray-600"
        >
          <BsTrash className="w-4 h-4" />
        </button>
        <button
          onClick={close}
          className="btn btn-sm btn-circle border-0 bg-white hover:bg-gray-200 text-gray-600"
        >
          <BsThreeDotsVertical className="w-4 h-4" />
        </button>
        <button
          onClick={close}
          className="btn btn-sm btn-circle border-0 bg-white hover:bg-gray-200 text-gray-600"
        >
          <IoCloseSharp className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="mx-4 my-2">
        {/* Title */}
        <div className="flex items-center gap-2 justify-between mx-1 my-2">
          <div className="flex items-center gap-2 ">
            <button
              className="rounded-full w-3 h-3"
              style={{ backgroundColor: color || "#1c64f2" }}
            ></button>
            {title}
          </div>
          {star ? (
            <AiFillStar
              onClick={(e) => setStar((star) => !star)}
              className="w-5 h-5 text-yellow-300 cursor-pointer"
            />
          ) : (
            <AiOutlineStar
              onClick={(e) => setStar((star) => !star)}
              className="w-5 h-5 text-yellow-300 cursor-pointer"
            />
          )}
        </div>

        {/* DateTime */}
        <div className="my-2 border-b border-gray-200">
          {moment(start).startOf("day").isSame(moment(end).startOf("day")) ? (
            <>
              <div className="flex items-center gap-2  my-2 w-full">
                <AiOutlineCalendar className="w-5 h-5 text-gray-600" />
                {moment(start).format("dddd, MMMM DD, YYYY")}
              </div>
              <div className="flex items-center gap-2  my-2 w-full">
                <FiClock className="w-5 h-5 text-gray-600" />
                {moment(start).isSame(moment(end)) ? (
                  <>{moment(start).format("hh:mm A")} </>
                ) : (
                  <>
                    {moment(start).format("hh:mm A")} to{" "}
                    {moment(end).format("hh:mm A")}{" "}
                    <span className="text-gray-500">
                      ({moment(end).from(moment(start), true)})
                    </span>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 ">
                <AiOutlineCalendar className="w-5 h-5 text-gray-600" />
                <div className="w-full">
                  {moment(start).format("dddd, MMMM DD hh:mm A")} -{" "}
                  {moment(end).format("dddd, MMMM DD hh:mm A")}{" "}
                  <span className="text-gray-500">
                    ({moment(end).from(moment(start), true)})
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Desription */}
        <div className="flex items-center gap-2 my-2 pb-2  border-b border-gray-200">
          <CgDetailsMore className="w-5 h-5 text-gray-600" />
          {description ? (
            <p className="w-full">{description}</p>
          ) : (
            <p className="text-gray-300 w-full">No description</p>
          )}
        </div>

        <div className="flex items-center gap-2 my-2 ">
          <GoLocation className="w-5 h-5 text-gray-600" />
          {false ? (
            <p className="w-full">{description}</p>
          ) : (
            <div className="text-gray-300">No location</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailPopup;
