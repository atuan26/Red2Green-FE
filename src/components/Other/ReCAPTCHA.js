import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const ReCaptcha = (props) => {
  return (
    <>
      <div className="w-full flex items-center justify-center">
        <ReCAPTCHA
          sitekey="6Ldyy2YgAAAAACO0ypwVJWVR7k-OoDbQ4zw8uwtf"
          onChange={(response) => props.input.onChange(response)}
        />
      </div>
      <p className="text-sm text-red-600 dark:text-red-50">
        {props.meta.touched && props.meta.error && (
          <>
            {Array.isArray(props.meta.error) ? (
              props.meta.error?.map((e, i) => <li key={i}>{e}</li>)
            ) : (
              <li>{props.meta.error}</li>
            )}
          </>
        )}
      </p>
    </>
  );
};

export default ReCaptcha;
