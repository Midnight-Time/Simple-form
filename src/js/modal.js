import { enableScroll, disableScroll } from "./utility";

// Show message in modal window
function showMessage(message) {
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
}

export default showMessage;
