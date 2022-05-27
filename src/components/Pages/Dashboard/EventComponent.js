import moment from "moment";
import React from "react";
import { invertColor } from "../../../ultils/convertColor";

export const EventItem = ({ title, start, end, color, icon, ...props }) => {
  color = color || "#3a82f6";
  const textColor = invertColor(color, 1);
  const timeStr = moment(start).format('H:mm')

  return (
    <div
      className="flex items-center mb-2 rounded-md justify-between p-3"
      style={{
        backgroundColor: color,
        border:
          color === "#FFFFFF" || color === "#ffffff"
            ? "3px solid #3a82f6"
            : null,
      }}
      {...props}
    >
      <span className="rounded-lg p-2 bg-white">
        {icon || (
          <svg
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M960 256q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm832 928v352q0 22-20 30-8 2-12 2-12 0-23-9l-93-93q-119 143-318.5 226.5t-429.5 83.5-429.5-83.5-318.5-226.5l-93 93q-9 9-23 9-4 0-12-2-20-8-20-30v-352q0-14 9-23t23-9h352q22 0 30 20 8 19-7 35l-100 100q67 91 189.5 153.5t271.5 82.5v-647h-192q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h192v-163q-58-34-93-92.5t-35-128.5q0-106 75-181t181-75 181 75 75 181q0 70-35 128.5t-93 92.5v163h192q26 0 45 19t19 45v128q0 26-19 45t-45 19h-192v647q149-20 271.5-82.5t189.5-153.5l-100-100q-15-16-7-35 8-20 30-20h352q14 0 23 9t9 23z"></path>
          </svg>
        )}
      </span>
      <div
        className="flex w-full ml-2 items-center justify-between  select-none"
        style={{ color: textColor }}
      >
        <p className="max-w-[160px] overflow-hidden">
          {title || "Untitled Event"}
        </p>
        <p>{timeStr}</p>
      </div>
    </div>
  );
};

export const EventDot = ({ color }) => {
  let colorList = [];
  for (const c of color) {
    if (!colorList.includes(c.color)) {
      colorList.push(c.color);
    }
  }
  return (
    <div className=" absolute left-1/2 transform -translate-x-1/2 mt-[6px] flex	justify-center">
      {colorList.slice(0, 4).map((c, i) => (
        <div
          key={i}
          className={"rounded-full mx-0.5 w-1.5 h-1.5"}
          style={{ backgroundColor: c || "#3a82f6" }}
        />
      ))}
    </div>
  );
};
export const AddEventBtn = ({ ...props }) => {
  return (
    <button
      className="flex items-center rounded-full p-1.5 hover:bg-gray-300 hover:text-black dark:text-gray-50 dark:hover:text-white text-gray-800 border-0 focus:outline-none"
      {...props}
    >
      <svg
        width="20"
        height="20"
        fill="currentColor"
        viewBox="0 0 1792 1792"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z"></path>
      </svg>
    </button>
  );
};
