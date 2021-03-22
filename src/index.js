// eslint-disable-next-line import/extensions
import Timer from './timer.js';

const timerObj = new Timer();

const timer = document.querySelector('.timer');
const timerMessage = document.querySelector('.timer_message');
const timerProgressBar = document.querySelector('.timer_progress-bar');
const timerRemainingTime = document.querySelector('.timer_remaining-time');

function decrementTimeRemaining() {
  if (timerObj.state === 'Paused') {
    return;
  }
  if (timerObj.remainingTime > 0) {
    timerObj.setTimer(timerObj.remainingTime - 1);
  }
}

function decrementProgressBar() {
  if (timerObj.state === 'Paused') {
    return;
  }
  if (timerObj.progressPercent > timerObj.decreasePerInterval) {
    timerProgressBar.setAttribute('width', `${timerObj.progressPercent - timerObj.decreasePerInterval}%`);
    timerObj.decrementProgressPercent();
  } else if (timerObj.progressPercent >= 0) {
    timerProgressBar.setAttribute('width', '0%');
    timerObj.updateProgressPercent(0);
  }
}

function updateTimerUI() {
  timerRemainingTime.innerHTML = timerObj.remainingTime;
  timerMessage.innerHTML = timerObj.message;
  // Update timer class
  if (timerObj.state === 'Active') {
    timerMessage.classList.add('timer_message--active');
    timerMessage.classList.remove('timer_message--paused');
  }
  if (timerObj.state === 'Paused') {
    timerMessage.classList.remove('timer_message--active');
    timerMessage.classList.add('timer_message--paused');
  }
}

function decrementTimer() {
  decrementTimeRemaining();
  decrementProgressBar();
  updateTimerUI();
}

function initializeTimer() {
  setInterval(decrementTimer, timerObj.timerSpeed);
}

function beginTimer() {
  timerObj.updateState('Active');
  timerObj.updateMessage('Pause');
  initializeTimer();
  updateTimerUI();
}

function pauseTimer() {
  timerObj.updateState('Paused');
  timerObj.updateMessage('Resume');
  updateTimerUI();
}

function resumeTimer() {
  timerObj.updateState('Active');
  timerObj.updateMessage('Pause');
  updateTimerUI();
}

timer.addEventListener('click', () => {
  if (timerObj.state === 'Uninitialized') {
    beginTimer();
    return;
  }
  if (timerObj.state === 'Active') {
    pauseTimer();
    return;
  }
  if (timerObj.state === 'Paused') {
    resumeTimer();
  }
});

// Initialize timer. If any of the JavaScript above should fail,
// the user will see a timer of 0 seconds and "Loading" text

timerRemainingTime.innerHTML = timerObj.startingTime;
timerMessage.innerHTML = 'Touch to Begin';
