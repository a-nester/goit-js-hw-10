import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector('button');
const dateInput = document.querySelector('#datetime-picker');

let userSelectedDate = {};
let timerDays = document.querySelector('span[data-days]');
let timerHours = document.querySelector('span[data-hours]');
let timerMinutes = document.querySelector('span[data-minutes]');
let timerSeconds = document.querySelector('span[data-seconds]');
let timerId = 0;
// startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate.getTime() <= Date.now()) {
      iziToast.show({
          title: 'Error',
          titleColor: 'Red',
          message: 'Please choose a date in the future',
        position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
});
        // window.alert('Please choose a date in the future');
      startBtn.disabled = true;
      return;
    }
    startBtn.disabled = false;
  },
};

flatpickr(dateInput, options); // flatpickr

startBtn.addEventListener('click', () => {
    timerId = setInterval(showTimer, 1000);
    startBtn.disabled = true;
    dateInput.disabled = true;
});

function showTimer() {
  const restTime = convertMs(userSelectedDate - Date.now());
  if ((userSelectedDate - Date.now()) > 0) {
    timerDays.textContent = addLeadingZero(restTime.days);
    timerHours.textContent = addLeadingZero(restTime.hours);
    timerMinutes.textContent = addLeadingZero(restTime.minutes);
    timerSeconds.textContent = addLeadingZero(restTime.seconds);
  } else {
      clearInterval(timerId);
      startBtn.disabled = false;
      dateInput.disabled = false;
    return;
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
