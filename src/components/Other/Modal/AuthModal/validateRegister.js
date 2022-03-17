import { SubmissionError } from "redux-form";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const validate = (values) => {
  const errors = {};
  const requiredFields = ["username", "email", "password", "password2"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "*Required";
    } else if (values[field] && values[field].length < 6) {
      errors[field] = "*Must be at least 6 characters.";
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "*Invalid email address";
  }
  if (
    values.password &&
    values.password.length >= 8 &&
    values.password2 &&
    values.password2.length >= 8 &&
    values.password !== values.password2
  ) {
    errors.password2 = "*Password and Confirm Password does not match.";
  }
  return errors;
};

export const submit = (values) => {
  return sleep(1000).then(() => {
    // simulate server latency
    if (!["john", "paul", "george", "ringo"].includes(values.username)) {
      throw new SubmissionError({
        username: "User does not exist",
        _error: "Login failed!",
      });
    } else if (values.password !== "password") {
      throw new SubmissionError({
        password: "Wrong password",
        _error: "Login failed!",
      });
    } else {
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
    }
  });
};
