import { useCallback } from "react";
import DatePicker from "react-datepicker";

import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import makeAnimated from "react-select/animated";
import CreatableSelect from "react-select/creatable";
import range from "../../../../ultils/range";
import { FloatingLabelInput } from "./../../Form";

const animatedComponents = makeAnimated();

export const RenderSelectInputCreatable = ({
  input,
  options,
  name,
  label,
  placeholder,
  getOptionLabel,
}) => (
  <div>
    <label
      htmlFor={name}
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
    >
      {label}
    </label>
    <CreatableSelect
      name={input.name}
      value={input.value.value}
      onChange={input.onChange}
      onBlurResetsInput={false}
      onCloseResetsInput={false}
      onFocus={input.onFocus}
      options={options}
      components={animatedComponents}
      closeMenuOnSelect={false}
      isMulti
      placeholder={placeholder}
      getOptionLabel={getOptionLabel}
    />
  </div>
);
export const EventInput = ({
  input,
  name,
  label,
  type,
  autoFocus,
  noWaring,
  className,
  required,
  meta: { touched, error },
}) => {
  return (
    <div className={className}>
      <FloatingLabelInput
        label={label}
        name={name}
        type={type}
        required={required}
        autoFocus={autoFocus}
        {...input}
      />
      {noWaring || (
        <p>
          {touched && error && (
            <span className="text-xs text-red-600 dark:text-red-500">
              {error}
            </span>
          )}
        </p>
      )}
    </div>
  );
};

export const EventTextArea = ({
  input,
  name,
  label,
  type,
  rows,
  className,
  placeholder,
  meta: { touched, error },
}) => {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        {label}
      </label>
      <textarea
        name={name}
        rows={rows || 4}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        {...input}
      ></textarea>
    </div>
  );
};

export const FieldDatePicker = ({
  input,
  placeholder,
  label,
  meta: { touched, error },
}) => {
  const years = range(1990, new Date().getFullYear() + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const customHeader = useCallback(
    ({
      date,
      changeYear,
      changeMonth,
      decreaseMonth,
      increaseMonth,
      prevMonthButtonDisabled,
      nextMonthButtonDisabled,
    }) => (
      <div className="flex justify-between items-center p-2">
        <div
          className="btn btn-sm btn-circle bg-white text-black border-0  hover:bg-gray-200"
          onClick={decreaseMonth}
          disabled={prevMonthButtonDisabled}
        >
          <MdOutlineNavigateBefore className="w-6 h-6 text-[#25396f]" />
        </div>
        <select
          className="select select-sm	text-sm w-18 h-9 scale-90"
          value={date.getFullYear()}
          onChange={({ target: { value } }) => changeYear(value)}
        >
          {years.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select
          className="select select-sm text-sm w-18 h-9 scale-90"
          value={months[date.getMonth()]}
          onChange={({ target: { value } }) =>
            changeMonth(months.indexOf(value))
          }
        >
          {months.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <div
          className="btn btn-sm btn-circle bg-white text-black border-0 hover:bg-gray-200"
          onClick={increaseMonth}
          disabled={nextMonthButtonDisabled}
        >
          <MdOutlineNavigateNext className="w-6 h-6 text-[#25396f]" />
        </div>
      </div>
    ),
    []
  );
  return (
    <>
      <label
        htmlFor={input.name}
        className="relative flex items-center text-sm font-medium text-gray-900 dark:text-gray-400 mr-2"
      >
        {label}
        {touched && error && (
          <span
            htmlFor={input.name}
            className="z-20 absolute -right-20 text-xs  text-red-500 dark:text-red-500"
          >
            {error}
          </span>
        )}
      </label>
      <DatePicker
        renderCustomHeader={customHeader}
        selected={input.value || null}
        onChange={input.onChange}
        showTimeInput
        // dateFormat="MM/dd/yyyy HH:mm"
        dateFormat="MM-dd-yyyy HH:mm"
        className=" block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        isClearable
      />
    </>
  );
};

export const SubmitButton = ({ label, disabled, type, ...props }) => {
  const disabledClass =
    "w-full text-white bg-blue-500 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center";
  const activeClass =
    "w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";

  return (
    <button
      type={type || "submit"}
      className={disabled ? disabledClass : activeClass}
      disabled={disabled}
      {...props}
    >
      {disabled && (
        <svg
          role="status"
          className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="#1C64F2"
          />
        </svg>
      )}
      {label || "Submit"}
    </button>
  );
};

export const ColorEventInput = ({ input, label, type, color, ...props }) => {
  return (
    <>
      <input
        className={`mx-4 border-transparent shadow-sm border-2 transition duration-300 checked:border-4 checked:border-[${color}50]  
          checked:ring-1 checked:ring-[${color}]
          focus:outline-none 
          checked:scale-110
          `}
        type="radio"
        {...props}
        {...input}
        style={{
          backgroundColor: color,
          boxSizing: "content-box",
        }}
      />
      <label>{label}</label>
    </>
  );
};

const COLORPICKER = ({ input: { value, onChange } }) => (
  <div>
    <button
      type="button"
      className={value === "male" ? "orangeTextButton" : ""}
      onClick={() => onChange("male")}
    >
      Male
    </button>
    <button
      type="button"
      className={value === "female" ? "orangeTextButton" : ""}
      onClick={() => onChange("female")}
    >
      Female
    </button>
  </div>
);
