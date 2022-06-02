import React from "react";
import { Field, reduxForm } from "redux-form";
import { EventInput, SubmitButton } from "../../EventModal/EventInput";
import validate from "../validate";
import renderField from "./renderField";

const WizardFormFirstPage = (props) => {
  const { error, handleSubmit, reset, submitting } = props;
  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-between flex-col rounded-lg px-6 overflow-y-scroll max-h-[80vh] min-h-[60vh] pb-6 "
    >
      <div className="mt-4 px-4">
        <Field
          name="name"
          type="text"
          component={EventInput}
          label="Name"
          required={true}
          className="mb-2"
        />
        <Field
          name="link"
          type="text"
          component={EventInput}
          label="Link"
          required={true}
          className="mb-2"
        />
        <Field
          name="information.reward"
          type="text"
          component={EventInput}
          label="Reward"
          className="mb-2"
        />
        <Field
          name="information.winner"
          type="text"
          component={EventInput}
          label="Winner"
          className="mb-2"
        />
      </div>
      <div className="flex gap-4">
        <button
          className="w-full border border-blue-500 text-blue-700 bg-white hover:bg-blue-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={reset}
        >
          Clear
        </button>
        <SubmitButton onClick={handleSubmit} label="Next" />
      </div>
    </form>
  );
};

export default reduxForm({
  form: "airdropForm", // <------ same form name
  destroyOnUnmount: true,
  initialValues: {
    start: new Date(),
    task_list: [{ task: " " }],
  },
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
})(WizardFormFirstPage);
