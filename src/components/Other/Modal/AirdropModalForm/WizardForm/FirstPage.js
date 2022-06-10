import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import {
  EventInput,
  EventTextArea,
  SubmitButton,
} from "../../EventModal/EventInput";
import validate from "../validate";
import { getFormValues } from "redux-form";
import { loadInitialValuesForm } from "../../../../../redux/actions/airdropAction";

const WizardFormFirstPage = (props) => {
  const {
    error,
    handleSubmit,
    reset,
    initialize,
    initialValues,
    values,
    loadInitialValuesForm,
  } = props;
  console.log("### values,  initialValues:", values === initialValues);
  console.log("### values,  :", values);
  console.log("### initialValues:", initialValues);
  useEffect(() => {
    if (values === initialValues || (!initialValues?.id && values?.id))
      initialize(initialValues); //for ADD form
    if (
      (initialValues?.id && initialValues === values) ||
      initialValues?.id !== values?.id
    )
      initialize(initialValues); //for EDIT form
  }, []);
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
        <Field
          name="description"
          type="text"
          component={EventTextArea}
          label="Airdrop description"
          rows={3}
        />
      </div>
      <div className="flex gap-4">
        <div
          className="w-full border border-blue-500 text-blue-700 bg-white hover:bg-blue-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
          onClick={reset}
        >
          Clear
        </div>
        <SubmitButton onClick={handleSubmit} label="Next" />
      </div>
    </form>
  );
};

export default reduxForm({
  form: "airdropForm", // <------ same form name
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  // enableReinitialize: true,
  // keepDirtyOnReinitialize: true,
  validate,
})(
  connect(
    (state) => ({
      values: getFormValues("airdropForm")(state),
    }),
    (dispatch) => ({
      loadInitialValuesForm: (payload) =>
        dispatch(loadInitialValuesForm(payload)),
    })
  )(WizardFormFirstPage)
);
