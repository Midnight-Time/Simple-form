// import * as exports from "./utility";
import "./styles/main.scss";
///
import IMask from "imask/holder";
import { Masked } from "imask/esm/index";

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
const allInputs = document.querySelectorAll(".input");
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
const valObj = {
  nameEl: false,
  email: false,
  phone: false,
  message: false,
};
// Error message object
const errorMessageObj = {
  nameEl: "Please enter your name",
  email: "Please enter a valid email",
  phone: "Please enter a valid phone number",
  message: "This field shall not be empty",
};
// Object to send
const sendlObj = {
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
function validation(input) {
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

// Input validation
allInputs.forEach((input) => {
  input.addEventListener("change", function () {
    validation(input);
    formisValid(valObj);
  });
});

// Enable the button
function formisValid(valObj) {
  if (valObj.nameEl && valObj.email && valObj.message) {
    formBtn.removeAttribute("disabled");
  } else {
    formBtn.setAttribute("disabled", true);
  }
}

////
const form = document.querySelector(".form");

// Show message in modal window
const showMessage = function (message) {
  const errorContainer = document.querySelector(".messageModal");
  const fetchingErrorText = document.querySelector(".messageModal__text");
  const overlay = document.querySelector(".overlay");

  overlay.classList.remove("hidden");
  errorContainer.classList.remove("hidden");
  fetchingErrorText.textContent = message;
  disableScroll();

  const closeOnClick = function () {
    overlay.classList.add("hidden");
    errorContainer.classList.add("hidden");
    enableScroll();
  };
  overlay.addEventListener("click", function () {
    closeOnClick();
  });
  errorContainer.addEventListener("click", function () {
    closeOnClick();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeOnClick();
    }
  });
};

const sendData = async function (data) {
  const response = await fetch(
    "https://my-project-83d90-default-rtdb.firebaseio.com/portfolioForm.json",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error(`Something went wrong! Error:${response.status}`);
  } else {
    showMessage("Your message was successfully delivered!");
  }
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (sendlObj) {
    showMessage("Your message was successfully delivered!");
  }
  sendData(sendlObj).catch((err) => showMessage(err.message));

  // Clear the inputs
  allInputs.forEach((input) => {
    input.value = "";
  });
  formBtn.setAttribute("disabled", true);

  // Clear the state object
  for (const key in valObj) {
    valObj[key] = false;
  }
});

///////////////////////////////////////
// PREVENT FROM SCROLLING
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
///////////////////////////////////////
const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
let supportsPassive = false;
try {
  window.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      get: function () {
        supportsPassive = true;
      },
    })
  );
} catch (e) {}

let wheelOpt = supportsPassive ? { passive: false } : false;
let wheelEvent =
  "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

// call this to Disable
function disableScroll() {
  window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
  window.addEventListener("keydown", preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener("DOMMouseScroll", preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener("touchmove", preventDefault, wheelOpt);
  window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
}
