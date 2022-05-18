import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { deleteEvent } from "../../../../redux/actions/eventAction";
import {
  ColorEventInput,
  EventInput,
  EventTextArea,
  FieldDatePicker,
  SubmitButton,
} from "./EventInput";

let EventForm = (props) => {
  const { error, handleSubmit, submitting, initialValues, deleteEvent, close } =
    props;
  return (
    <form
      onSubmit={handleSubmit}
      className="px-6 pb-4 space-y-3 lg:px-8 sm:pb-6 xl:pb-8"
    >
      <Field
        name="title"
        type="text"
        component={EventInput}
        label="Title"
        autoFocus={true}
      />
      <div className="flex justify-between items-center !mt-0">
        <Field
          component={FieldDatePicker}
          name="start"
          placeholder="YYYY/MM/DD"
          label="Time:"
        />
        <div className="text-gray-400 mx-2">-</div>
        <Field
          component={FieldDatePicker}
          name="end"
          placeholder="YYYY/MM/DD"
        />
      </div>
      <div className="flex pt-1">
        <label>Color: </label>
        <Field
          name="color"
          component={ColorEventInput}
          type="radio"
          value="#FF00FF"
          color="#FF00FF"
        />
        <Field
          name="color"
          component={ColorEventInput}
          type="radio"
          value="#00FF00"
          color="#00FF00"
        />
        <Field
          name="color"
          component={ColorEventInput}
          type="radio"
          value="#00AA66"
          color="#00AA66"
        />
        <Field
          name="color"
          component={ColorEventInput}
          type="radio"
          value="#00FFF3"
          color="#00FFF3"
        />
        <Field
          name="color"
          component={ColorEventInput}
          type="radio"
          color="#0AAAF3"
          value="#0AAAF3"
        />
      </div>
      <Field
        name="description"
        type="text"
        component={EventTextArea}
        label="Description"
      />
      {error && <strong>{error}</strong>}
      <SubmitButton
        label={initialValues?.title ? "Save" : "Add"}
        disabled={submitting}
      />
      {initialValues?.id && (
        <button
          onClick={() => {
            deleteEvent(initialValues);
            close();
          }}
          type="submit"
          class="w-full text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
        >
          Delete
        </button>
      )}
    </form>
  );
};

const validate = (values) => {
  const errors = {};
  const requiredFields = ["title", "start"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "*Required";
    }
  });
  return errors;
};

EventForm = reduxForm({
  form: "eventForm",
  validate,
})(EventForm);

const mapDispatchtoProps = (dispatch) => ({
  deleteEvent: (initialValues) => dispatch(deleteEvent(initialValues)),
});

export default connect(null, mapDispatchtoProps)(EventForm);
