import { useState } from "react";

export const ValidationHook = (
  validateValue,
  validatePositiveNumber = false
) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const valueIsValid = validateValue(enteredValue);
  const hasError = !enteredValue && isTouched;
  const [isPositive, setPositive] = useState(true);
  const valueChangedHandler = (event) => {
    setEnteredValue(event.target.value);
  };
  const inputBluredHandler = (event) => {
    if (validatePositiveNumber && event.target.value !== "") {
      let regPositiveNumber = /\d+/;
      if (!regPositiveNumber.test(event.target.value)) {
        setPositive(false);
      } else {
        setPositive(true);
      }
    }

    setIsTouched(true);
  };
  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };
  return {
    value: enteredValue,
    hasError,
    valueChangedHandler,
    inputBluredHandler,
    isValid: valueIsValid,
    reset,
    isPositive: isPositive,
  };
};

export default ValidationHook;
