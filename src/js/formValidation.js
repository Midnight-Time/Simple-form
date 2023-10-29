import IMask from "imask/holder";
import { Masked } from "imask/esm/index";
///

///////////////////////////////////////
// PHONE MASK
///////////////////////////////////////
const phone = document.getElementById("phone");
const maskOptions = {
  mask: "+{375}(00)000-00-00",
};
const mask = new IMask(phone, maskOptions);

///////////////////////////////////////
// FORM VALIDATION
///////////////////////////////////////
const formBtn = document.querySelector(".form__button");

// Show error message under the input
const showError = function (input, message) {
  const formControl = input.parentElement;
  formControl.className = "form__group error";
  const errorText = formControl.querySelector(".error-text");
  errorText.className = "error-text shown";
  errorText.innerText = message;
};

// Hide error message under the input
const hideError = function (input) {
  const formControl = input.parentElement;
  formControl.className = "form__group";
  const errorText = formControl.querySelector(".error-text");
  errorText.className = "error-text hide";
  errorText.innerText = "";
};

// State object
export const valObj = {
  nameEl: false,
  email: false,
  phone: false,
  message: false,
};
// Error message object
export const errorMessageObj = {
  nameEl: "Please enter your name",
  email: "Please enter a valid email",
  phone: "Please enter a valid phone number",
  message: "This field shall not be empty",
};
// Object to send
export const sendlObj = {
  nameEl: "",
  email: "",
  phone: "",
  message: "",
  sendTime: new Date(),
};

const phoneValidation = (input) => {
  if (mask.masked.isComplete) {
    hideError(input);
    valObj[input.id] = true;
    sendlObj[input.id] = mask.unmaskedValue;
  } else {
    showError(input, `${errorMessageObj[`${input.id}`]}`);
    valObj[input.id] = false;
  }
};

// Validation using built-in type attibute and mask
export function validation(input) {
  if (input.id === "phone") {
    phoneValidation(input);
  } else if (input.validity.valid) {
    hideError(input);
    valObj[input.id] = true;
    sendlObj[input.id] = input.value;
  } else {
    showError(input, `${errorMessageObj[`${input.id}`]}`);
    valObj[input.id] = false;
  }
}

// Enable the button
export function formisValid(valObj) {
  if (valObj.nameEl && valObj.email && valObj.message) {
    formBtn.removeAttribute("disabled");
  } else {
    formBtn.setAttribute("disabled", true);
  }
}
