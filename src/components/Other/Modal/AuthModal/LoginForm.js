import React from "react";
import { Field, reduxForm } from "redux-form";
import { AuthInput, RememberInput, SubmitButton } from "./AuthInput";
import { validate } from "./validateLogin";

const LoginForm = (props) => {
  const { error, handleSubmit, pristine, reset, submitting, onSwitch } = props;
  return (
    <form
      onSubmit={handleSubmit}
      className="px-6 pb-4 space-y-4 lg:px-8 sm:pb-6 xl:pb-8"
    >
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">
        Log in to your account
      </h3>
      <Field
        name="username"
        type="text"
        component={AuthInput}
        label="Email/Username"
      />
      <Field
        name="password"
        type="password"
        component={AuthInput}
        label="Password"
      />
      <RememberInput />
      <SubmitButton label="Log in" disabled={submitting} />
      <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
        Not registered?
        <a
          href="#"
          className="text-blue-700 hover:underline dark:text-blue-500"
          onClick={onSwitch}
        >
          {" "}
          Create account
        </a>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "loginForm",
  validate,
})(LoginForm);
