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

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate.getTime() <= Date.now()) {
      iziToast.error({
          title: 'Error',
          titleColor: 'White',
          message: 'Please choose a date in the future',
          messageColor: 'White',
          backgroundColor: 'Red',
        position: 'topRight'
});
      startBtn.disabled = true;
      return;
    }
    startBtn.disabled = false;
  },
};

flatpickr(dateInput, options); 

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
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
