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
  const progressBarWidth = timerProgressBar.getAttribute('width');
  const progressBarPercentage = parseFloat(progressBarWidth);
  const progressBarStartingWidth = 100;
  const decreasePerSecond = progressBarStartingWidth / timerObj.startingTime;
  const timerMessageClass = timerMessage.getAttribute('class');
  if (timerMessageClass.includes('timer_message--paused')) {
    return;
  }
  if (progressBarPercentage > decreasePerSecond) {
    timerProgressBar.setAttribute('width', `${progressBarPercentage - decreasePerSecond}%`);
  } else if (progressBarPercentage >= 0) {
    timerProgressBar.setAttribute('width', '0%');
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

function startTimer() {
  setInterval(decrementTimer, timerObj.timerSpeed);
}

function beginTimer() {
  timerObj.updateState('Active');
  timerObj.updateMessage('Pause');
  updateTimerUI();
  startTimer();
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
  const timerMessageClass = timerMessage.getAttribute('class');
  if (timerMessageClass === 'timer_message') {
    beginTimer();
  }
  if (timerMessageClass.includes('timer_message--active')) {
    pauseTimer();
  }
  if (timerMessageClass.includes('timer_message--paused')) {
    resumeTimer();
  }
});

// Initialize timer. If any of the JavaScript above should fail,
// the user will see a timer of 0 seconds and "Loading" text

timerRemainingTime.innerHTML = timerObj.startingTime;
timerMessage.innerHTML = 'Touch to Begin';
