import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  startBtn: document.querySelector('[data-start]'),
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
  onOpen() {
    if (timer.isStarted) this.close();
  },
  onClose(selectedDates) {
    if (timer.isStarted) return;

    timer.selectedDate = selectedDates[0];

    const isValidDate = timer.getCountDownTime() > 0;
    refs.startBtn.disabled = !isValidDate;

    if (!isValidDate) {
      window.alert('Please choose a date in the future');
      return;
    }
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

function updateRefs(decomposedDate) {
  for (const key of Object.keys(decomposedDate)) {
    refs[key + 'Value'].textContent = decomposedDate[key];
  }
}

class Timer {
  constructor({ getDecomposedDate, updateRefs }) {
    this.isStarted = false;
    this.intervalId = null;
    this.selectedDate = null;
    this.getDecomposedDate = getDecomposedDate;
    this.updateRefs = updateRefs;
  }

  start() {
    console.log(this);
    this.intervalId = setInterval(() => {
      const countDownTime = this.getCountDownTime();
      if (countDownTime < 0) {
        clearInterval(this.intervalId);
        this.isStarted = false;
        return;
      }

      const decomposedDate = this.getDecomposedDate(this.getCountDownTime());
      console.log(decomposedDate);
      this.updateRefs(decomposedDate);
    }, 1000);
    this.isStarted = true;
    refs.startBtn.disabled = this.isStarted;
  }

  getCountDownTime() {
    return this.selectedDate - Date.now();
  }
}

const timer = new Timer({ getDecomposedDate: convertMs, updateRefs });

flatpickr('#datetime-picker', options);

refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', () => {
  console.log('start');
  timer.start.call(timer);
});
