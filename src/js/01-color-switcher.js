const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

class ColorSwitcher {
  constructor(onToggle) {
    this.changeColorIntervalId = null;
    this.onToggle = onToggle;
  }

  start() {
    this.changeColorIntervalId = setInterval(() => {
      document.body.style.backgroundColor = this.getRandomHexColor();
    }, 1000);

    this.onToggle();
  }

  stop() {
    clearInterval(this.changeColorIntervalId);
    this.onToggle();
  }

  getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
}

function toggleBtnAccessibility() {
  refs.startBtn.toggleAttribute('disabled');
  refs.stopBtn.toggleAttribute('disabled');
}

const switcher = new ColorSwitcher(toggleBtnAccessibility);

refs.stopBtn.disabled = true;

refs.startBtn.addEventListener('click', switcher.start.bind(switcher));
refs.stopBtn.addEventListener('click', switcher.stop.bind(switcher));
