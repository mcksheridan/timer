// eslint-disable-next-line import/extensions
import Timer from './timer.js';

window.customElements.define('timer-object', Timer);

const timer = new Timer();

const timerButton = document.querySelector('.timer-button_control');
const timerProgressBar = document.querySelector('.timer-bar_progress');
const timerRemainingTime = document.querySelector('.timer-bar_remaining-time');

function updateTimerUI() {
  timerRemainingTime.innerHTML = timer.remainingTime;
  timerButton.innerHTML = timer.message;
  timerProgressBar.setAttribute('width', `${timer.progressPercent}%`);
  // Update timer class
  if (timer.state === 'Active') {
    timerButton.classList.add('timer_message--active');
    timerButton.classList.remove('timer_message--paused');
  }
  if (timer.state === 'Paused') {
    timerButton.classList.remove('timer_message--active');
    timerButton.classList.add('timer_message--paused');
  }
}

function decrementTimer() {
  timer.decrementTimeRemaining();
  timer.decrementProgressBar();
  updateTimerUI();
}

function initializeTimer() {
  setInterval(decrementTimer, timer.timerSpeed);
}

function beginTimer() {
  timer.updateState('Active');
  timer.updateMessage('Pause');
  initializeTimer();
  updateTimerUI();
}

function pauseTimer() {
  timer.updateState('Paused');
  timer.updateMessage('Resume');
  updateTimerUI();
}

function resumeTimer() {
  timer.updateState('Active');
  timer.updateMessage('Pause');
  updateTimerUI();
}

timerButton.addEventListener('click', () => {
  if (timer.state === 'Uninitialized') {
    beginTimer();
    return;
  }
  if (timer.state === 'Active') {
    pauseTimer();
    return;
  }
  if (timer.state === 'Paused') {
    resumeTimer();
  }
});
