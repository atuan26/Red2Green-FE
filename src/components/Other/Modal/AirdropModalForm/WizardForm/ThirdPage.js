import React from "react";
import { CgPlayListAdd, CgRemove } from "react-icons/cg";
import { Field, FieldArray, reduxForm } from "redux-form";
import {
  EventInput,
  EventTextArea,
  SubmitButton,
} from "../../EventModal/EventInput";
import validate from "../validate";

const WizardFormThirdPage = (props) => {
  const { handleSubmit, pristine, previousPage, submitting } = props;
  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-between flex-col rounded-lg px-6 overflow-y-scroll max-h-[80vh] min-h-[60vh] pb-6 "
    >
      <div className="mt-4 px-4">
        <Field
          name="social.telegram_channel"
          type="text"
          component={EventInput}
          label="Telegram Channel"
        />
        <Field
          name="social.twitter"
          type="text"
          component={EventInput}
          label="Twitter"
        />
        <Field
          name="social.facebook"
          type="text"
          component={EventInput}
          label="Facebook"
        />
        <Field
          name="social.medium"
          type="text"
          component={EventInput}
          label="Medium"
        />
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
const renderTasks = ({ fields, meta: { touched, error } }) => (
  <ul>
    {/* <label>Task: </label> */}
    <li>
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
      <li key={index}>
        <button
          type="button"
          className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
          onClick={() => fields.remove(index)}
        >
          <CgRemove className="inline w-4 h-4 " />
        </button>
        <h4>Task #{index + 1}</h4>
        <Field
          name={`${task}.detail`}
          type="text"
          component={EventTextArea}
          label="Detail"
          rows={3}
        />
      </li>
    ))}
  </ul>
);
export default reduxForm({
  form: "airdropForm",
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  validate,
})(WizardFormThirdPage);
