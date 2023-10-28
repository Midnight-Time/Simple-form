///////////////////////////////////////
// FORM VALIDATION
///////////////////////////////////////
const allInputs = document.querySelectorAll(".input");
const formBtn = document.querySelector(".contact__btn");

// Show error message under the input
const showError = function (input, message) {
  const formControl = input.parentElement;
  formControl.className = "contact__form__group error";
  const errorText = formControl.querySelector(".error-text");
  errorText.className = "error-text shown";
  errorText.innerText = message;
};

// Hide error message under the input
const hideError = function (input) {
  const formControl = input.parentElement;
  formControl.className = "contact__form__group success";
  const errorText = formControl.querySelector(".error-text");
  errorText.className = "error-text hide";
  errorText.innerText = "";
};

// State object
const valObj = {
  nameEl: false,
  email: false,
  message: false,
};
// Error message object
const errorMessageObj = {
  nameEl: "Please enter your name",
  email: "Please enter a valid email",
  message: "Please write me something",
};
// Object to send
const sendlObj = {
  nameEl: "",
  email: "",
  message: "",
};

// Validation using built-in type attibute
function validation(input) {
  if (input.validity.valid) {
    hideError(input);
    valObj[input.id] = true;
    sendlObj[input.id] = input.value;
  } else {
    showError(input, `${errorMessageObj[`${input.id}`]}`);
    valObj[input.id] = false;
  }
}

// Input validation
allInputs.forEach((input) => {
  input.addEventListener("change", function () {
    validation(input);
    formisValid(valObj);
  });
});

// Enable the button
function formisValid(someObj) {
  if (someObj.nameEl && someObj.email && someObj.message) {
    formBtn.removeAttribute("disabled");
  } else {
    formBtn.setAttribute("disabled", true);
  }
}
