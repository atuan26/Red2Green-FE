import { SubmissionError } from "redux-form";

export const validate = (values) => {
  const errors = {};
  const requiredFields = ["username", "password"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    } else if (values[field] && values[field].length < 6) {
      if (field === "username" && values[field] === "admin") {
      } else {
        errors[field] = "Must be at least 6 characters.";
      }
    }
  });
  return errors;
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
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
