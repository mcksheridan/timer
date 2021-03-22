// eslint-disable-next-line import/extensions
import Timer from './timer.js';

const timerObj = new Timer();

const timer = document.querySelector('.timer');
const timerButton = document.querySelector('.timer-button');
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
    timerObj.decrementProgressPercent();
    return;
  }
  if (timerObj.progressPercent >= 0) {
    timerObj.updateProgressPercent(0);
  }
}

function updateTimerUI() {
  timerRemainingTime.innerHTML = timerObj.remainingTime;
  timerButton.innerHTML = timerObj.message;
  timerProgressBar.setAttribute('width', `${timerObj.progressPercent}%`);
  // Update timer class
  if (timerObj.state === 'Active') {
    timerButton.classList.add('timer_message--active');
    timerButton.classList.remove('timer_message--paused');
  }
  if (timerObj.state === 'Paused') {
    timerButton.classList.remove('timer_message--active');
    timerButton.classList.add('timer_message--paused');
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

timerButton.addEventListener('click', () => {
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
timerButton.innerHTML = 'Touch to Begin';
