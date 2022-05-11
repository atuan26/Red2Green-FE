import { useState } from "react";
import ReactDatePicker from "react-datepicker";

export const DateRangePicker = ({ onRangeChange, ...props }) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  console.log('### props.name :', props.name)
  return (
    <ReactDatePicker
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => {
        console.log('### update :', update)
        setDateRange(update);
        onRangeChange()
      }}
      isClearable={true}
      {...props}
    />
  );
};