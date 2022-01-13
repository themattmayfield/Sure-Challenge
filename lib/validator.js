import React from "react";
import validator from "validator";

const useValidator = () => {
  const validateAlpha = (value) => {
    let error;
    if (!value) {
      error = "Required";
    } else if (!validator.isAlpha(value, "en-US", { ignore: " " })) {
      error = "Only letters allowed in this field";
    }

    return error;
  };

  const validateAlphaNumeric = (value) => {
    let error;
    if (!value) {
      error = "Required";
    } else if (!validator.isAlphanumeric(value, "en-US", { ignore: " " })) {
      error = "Only numbers and letters allowed";
    }

    return error;
  };

  const validatePostal = (value) => {
    let error;
    if (!value) {
      error = "Required";
    } else if (!validator.isPostalCode(value, "any")) {
      error = "Invalid Postal Code";
    } else if (value.length !== 5) {
      error = "Postal Code must be 5 digits";
    }

    return error;
  };

  const validate = (value, value2, errorString) => {
    let error;
    if (!value) {
      error = "Required";
    }

    return error;
  };

  return {
    validateAlpha,
    validatePostal,

    validateAlphaNumeric,
    validate,
  };
};

export default useValidator;
