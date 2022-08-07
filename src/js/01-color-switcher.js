const startBtnRef = document.querySelector('[data-start]');
const stopBtnRef = document.querySelector('[data-stop]');

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
  startBtnRef.toggleAttribute('disabled');
  stopBtnRef.toggleAttribute('disabled');
};

stopBtnRef.disabled = true;

startBtnRef.addEventListener('click', startBtnClickHandler);

stopBtnRef.addEventListener('click', stopBtnClickHandler);
