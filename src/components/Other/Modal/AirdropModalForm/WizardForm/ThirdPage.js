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
          name="social.official_site"
          type="text"
          component={EventInput}
          label="Official Site"
        />
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
          name="social.discord"
          type="text"
          component={EventInput}
          label="Discord"
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
        <div
          className="cursor-pointer w-full border border-blue-500 text-blue-700 bg-white hover:bg-blue-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={previousPage}
        >
          Previous
        </div>
        <SubmitButton label="Next" />
      </div>
    </form>
  );
};
export default reduxForm({
  form: "airdropForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  // enableReinitialize: true,
  validate,
})(WizardFormThirdPage);
