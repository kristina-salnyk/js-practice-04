const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};
let changeColorIntervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtnClickHandler = () => {
  changeColorIntervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  toggleBtnAccessibility();
};

const stopBtnClickHandler = () => {
  clearInterval(changeColorIntervalId);
  toggleBtnAccessibility();
};

const toggleBtnAccessibility = () => {
  refs.startBtn.toggleAttribute('disabled');
  refs.stopBtn.toggleAttribute('disabled');
};

refs.stopBtn.disabled = true;

refs.startBtn.addEventListener('click', startBtnClickHandler);
refs.stopBtn.addEventListener('click', stopBtnClickHandler);
