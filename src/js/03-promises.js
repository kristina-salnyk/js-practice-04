import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function getValueFields() {
  return {
    delay: Number(refs.delay.value),
    step: Number(refs.step.value),
    amount: Number(refs.amount.value),
  };
}

function verifyValues({ delay, step, amount }) {
  let isValidData = true;

  if (delay < 0) {
    Notify.failure('Enter a non-negative delay value');
    isValidData = false;
  }

  if (step < 0) {
    Notify.failure('Enter a non-negative step value');
    isValidData = false;
  }

  if (amount <= 0) {
    Notify.failure('Enter a positive count of promises');
    isValidData = false;
  }

  return isValidData;
}

const submitFormHandler = event => {
  event.preventDefault();

  const values = getValueFields();
  if (!verifyValues(values)) return;

  const { delay, step, amount } = values;
  for (
    let position = 1, currDelay = delay;
    position <= amount;
    position += 1, currDelay += step
  )
    createPromise(position, currDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
};

refs.form.addEventListener('submit', submitFormHandler);
