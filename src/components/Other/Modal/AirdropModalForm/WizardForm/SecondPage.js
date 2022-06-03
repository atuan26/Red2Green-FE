import React, { useRef, useState } from "react";
import { CgClose, CgPlayListAdd, CgRemove } from "react-icons/cg";
import { Field, FieldArray, reduxForm } from "redux-form";
import {
  EventInput,
  FieldDatePicker,
  SubmitButton,
} from "../../EventModal/EventInput";
import validate from "../validate";
import renderField from "./renderField";

const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <span>{error}</span> : false;

const WizardFormSecondPage = (props) => {
  const { handleSubmit, previousPage } = props;
  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-between flex-col rounded-lg px-6 overflow-y-scroll max-h-[80vh] min-h-[60vh] pb-6 "
    >
      <div className="mt-4 px-4">
        <EditableLabelDateField label="Start" name="start" className="mb-4" />
        <EditableLabelDateField label="End" name="end" className="mb-4" />
        <div className="divider" />
        {/* <FieldArray name='time' component={renderDateInput2} /> */}
      </div>
      <div className="flex gap-4">
        <button
          className="w-full border border-blue-500 text-blue-700 bg-white hover:bg-blue-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={previousPage}
        >
          Previous
        </button>
        <SubmitButton label="Next" />
      </div>
    </form>
  );
};

const renderDateInput = ({ fields, meta: { touched, error } }) => (
  <ul>
    <li>
      <button
        type="button"
        className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
        onClick={() => fields.push({})}
      >
        <CgPlayListAdd className="inline w-4 h-4 mr-2" />
        Add event
      </button>
      {touched && error && <span>{error}</span>}
    </li>
    {fields.map((event, index) => (
      <li key={index} className="flex items-center justify-between  mb-4">
        <EditableLabelDateField
          label={fields.name + `[${index}]`}
          name={fields.name + `[${index}]`}
          editable={true}
        />
        <CgClose
          onClick={() => fields.remove(index)}
          className="inline w-4 h-4 text-red-400 hover:text-white hover:bg-red-500 p-2 border-2 border-red-500 rounded-md box-content"
        />
      </li>
    ))}
  </ul>
);

const EditableLabelDateField = ({ label, name, editable, className }) => {
  const [labelEditable, setLabelEditable] = useState(label || "Event");
  const value = useRef(labelEditable);
  const handleChange = (e) => {
    setLabelEditable(e.target.innerHTML);
  };
  console.log(
    editable
      ? `${name}.${labelEditable.replace(/\s+/g, "_").trim()}`
      : `${name}`
  );
  return (
    <div className={"flex items-center justify-between " + className}>
      <label
        className="flex-1 min-w-[80px] w-1/3 whitespace-nowrap "
        onInput={handleChange}
        contentEditable={editable}
        dangerouslySetInnerHTML={{ __html: value.current }}
      />
      <Field
        component={FieldDatePicker}
        name={name}
        placeholder="YYYY/MM/DD"
        className="flex-1 "
      />
    </div>
  );
};

const renderDateInput2 = ({ fields, meta: { touched, error } }) => (
  <ul>
    <li className="flex justify-center mt-2">
      <button
        type="button"
        className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
        onClick={() => fields.push({})}
      >
        <CgPlayListAdd className="inline w-4 h-4 mr-2" />
        Add task
      </button>
      {touched && error && <span>{error}</span>}
    </li>
    {fields.map((task, index) => (
      <li key={index} className="flex items-center justify-between  mb-4">
        {console.log(task)}
        <EditableLabelDateField
          label={`${task} #${index + 1}`}
          name={`${task}.task`}
          editable={true}
        />
        <CgClose
          onClick={() => fields.remove(index)}
          className="inline w-4 h-4 text-red-400 hover:text-white hover:bg-red-500 p-2 border-2 border-red-500 rounded-md box-content"
        />
      </li>
    ))}
  </ul>
);
export default reduxForm({
  form: "airdropForm",
  // initialValues: {
  //   start: new Date(),
  //   task_list: [{ task: "Describe the required task" }],
  // },
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(WizardFormSecondPage);
