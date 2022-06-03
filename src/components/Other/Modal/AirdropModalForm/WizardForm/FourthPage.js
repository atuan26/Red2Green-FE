import React, { useMemo } from "react";
import { CgClose, CgPlayListAdd, CgRemove } from "react-icons/cg";
import { Field, FieldArray, reduxForm } from "redux-form";
import {
  EventTextArea,
  RenderSelectInputCreatable,
  SubmitButton,
} from "../../EventModal/EventInput";
import validate from "../validate";
import { socialList } from "../../../../../redux/actions/airdropAction";

const WizardFormThirdPage = (props) => {
  const { handleSubmit, pristine, previousPage, submitting } = props;
  const options = useMemo(() => socialList, []);
  return (
    <form className="flex justify-between flex-col rounded-lg px-6 overflow-y-scroll max-h-[80vh] min-h-[60vh] pb-6 ">
      <div className="mt-4 px-4">
        <Field
          label="Requirements"
          name="information.requirement"
          component={RenderSelectInputCreatable}
          options={options}
          placeholder="Requirement"
          getOptionLabel={(e) => (
            <div>
              {e.icon}
              {e.label}
            </div>
          )}
        />
        <div className="divider m-0" />
        <FieldArray name="task_list" component={renderTasks} />
      </div>
      <div className="flex gap-4">
        <button
          className="w-full border border-blue-500 text-blue-700 bg-white hover:bg-blue-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={previousPage}
        >
          Previous
        </button>
        <SubmitButton
          onClick={handleSubmit}
          label="Submit"
          disabled={submitting}
        />
      </div>
    </form>
  );
};
const renderTasks = ({ fields, meta: { touched, error } }) => (
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
      <li className="mb-4" key={index}>
        <div className="divider m-0" />
        <h4 className="flex justify-between items-center">
          Task #{index + 1}
          <CgClose
            onClick={() => fields.remove(index)}
            className="inline w-4 h-4 text-red-400 hover:text-white hover:bg-red-500 p-2 border-2 border-red-500 rounded-md box-content"
          />
        </h4>
        <Field
          name={`${task}.task`}
          type="text"
          component={EventTextArea}
          // label="Detail"
          placeholder="Please describe the task"
          rows={2}
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
