import React, { memo, useState, useEffect, useRef } from "react";
import moment from "moment";

const Countdown = ({ label, time }) => {
  const [countDown, setCountDown] = useState({});
  useEffect(() => {
    const getCountdown = () => {
      const now = moment();
      const endTime = moment(time);
      var ms = moment(endTime, "DD/MM/YYYY HH:mm:ss").diff(
        moment(now, "DD/MM/YYYY HH:mm:ss")
      );
      var diff = moment.duration(ms);
      const d = Math.floor(diff.asDays());
      const h = moment.utc(ms).format("HH");
      const m = moment.utc(ms).format("mm");
      const s = moment.utc(ms).format("ss");
      if (d >= 0) {
        setCountDown({ d: d, h: h, m: m, s: s });
      }
    };
    getCountdown();
    const countdownInterval = setInterval(getCountdown, 1000);
    return () => {
      clearInterval(countdownInterval);
    };
  }, []);
  return (
    <>
      {Object.keys(countDown).length !== 0 && (
        <div className="flex gap-2">
          {label}
          <span className="animate-bounce">{countDown.d}</span>:
          <span className="animate-bounce">{countDown.h}</span>:
          <span className="animate-bounce">{countDown.m}</span>:
          <span className="animate-bounce">{countDown.s}</span>
        </div>
      )}
    </>
  );
};

export default memo(Countdown);
