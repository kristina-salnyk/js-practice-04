import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  dateInput: document.querySelector('#datetime-picker'),
  daysValue: document.querySelector('[data-days]'),
  hoursValue: document.querySelector('[data-hours]'),
  minutesValue: document.querySelector('[data-minutes]'),
  secondsValue: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timer.selectedDate = selectedDates[0];

    if (timer.getCountDownTime() <= 0) {
      Notify.failure('Please choose a date in the future');
      return;
    }

    timer.onDateSelection();
  },
};

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

function updateValueFields(decomposedDate) {
  for (const key of Object.keys(decomposedDate))
    refs[key + 'Value'].textContent = addLeadingZero(decomposedDate[key]);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

class Timer {
  constructor({ onDateSelection, onTimeStart, onTimeChange, onTimeOver }) {
    this.intervalId = null;
    this.selectedDate = null;
    this.onDateSelection = onDateSelection;
    this.onTimeStart = onTimeStart;
    this.onTimeChange = onTimeChange;
    this.onTimeOver = onTimeOver;
  }

  start() {
    this.intervalId = setInterval(() => {
      const countDownTime = this.getCountDownTime();

      if (countDownTime <= 0) {
        Notify.success('Time is over');
        clearInterval(this.intervalId);
        this.onTimeOver();
        return;
      }

      this.onTimeChange(countDownTime);
    }, 1000);

    this.onTimeStart();
  }

  getCountDownTime() {
    return this.selectedDate - Date.now();
  }
}

const parameters = {
  onDateSelection: () => {
    refs.startBtn.disabled = false;
  },
  onTimeStart: () => {
    refs.startBtn.disabled = true;
    refs.dateInput.disabled = true;
  },
  onTimeChange: countDownTime => {
    updateValueFields(convertMs(countDownTime));
  },
  onTimeOver: () => {
    refs.dateInput.disabled = false;
  },
};

const timer = new Timer(parameters);

flatpickr('#datetime-picker', options);

refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', () => timer.start());
