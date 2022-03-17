import React from "react";
import { Field, reduxForm } from "redux-form";
import { AuthInput, SubmitButton } from "./AuthInput";
import { validate } from "./validateRegister";

const RegisterForm = (props) => {
  const { handleSubmit, submitting, onSwitch } = props;
  return (
    <form
      onSubmit={handleSubmit}
      className="px-6 pb-4 space-y-4 lg:px-8 sm:pb-6 xl:pb-8"
    >
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">
        Register new account
      </h3>
      <Field name="email" type="email" component={AuthInput} label="Email" />
      <Field
        name="username"
        type="text"
        component={AuthInput}
        label="Username"
      />
      <Field
        name="password"
        type="password"
        component={AuthInput}
        label="Password"
      />
      <Field
        name="password2"
        type="password"
        component={AuthInput}
        label="Confirm Password"
      />
      <SubmitButton label="Register" disabled={submitting} />
      <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
        Already have account?
        <a
          href="#"
          className="text-blue-700 hover:underline dark:text-blue-500"
          onClick={onSwitch}
        >
          {" "}
          Log in
        </a>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "RegisterForm",
  validate,
})(RegisterForm);
