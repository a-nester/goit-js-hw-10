
// const flatpickr = require("flatpickr");
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

console.log("Hi");

const myInput = document.querySelector("#datetime-picker");
flatpickr(myInput, options);  // flatpickr