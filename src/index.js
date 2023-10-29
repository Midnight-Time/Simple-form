import "./styles/main.scss";
///
import { formisValid, validation, valObj, sendlObj } from "./js/formValidation";
import sendData from "./js/formSending";
import showMessage from "./js/modal";

/// Input fields validation
const allInputs = document.querySelectorAll(".input");
allInputs.forEach((input) => {
  input.addEventListener("change", function () {
    validation(input);
    formisValid(valObj);
  });
});

/// Form sending event
const form = document.querySelector(".form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  sendData(sendlObj).catch((err) => showMessage(err.message));

  // Clear the inputs
  allInputs.forEach((input) => {
    input.value = "";
  });
  const formBtn = document.querySelector(".form__button");
  formBtn.setAttribute("disabled", true);

  // Clear the state object
  for (const key in valObj) {
    valObj[key] = false;
  }
});
