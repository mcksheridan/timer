class Timer {
  constructor() {
    this.startingTime = 60;
    this.timerSpeed = 100;
    this.remainingTime = this.startingTime;
    this.message = 'Touch to Begin';
  }

  setTimer(time) {
    this.remainingTime = time;
  }

  updateMessage(message) {
    this.message = message;
  }
}

const timerObj = new Timer();

const timer = document.querySelector('.timer');
const timerMessage = document.querySelector('.timer_message');
const timerProgressBar = document.querySelector('.timer_progress-bar');
const timerRemainingTime = document.querySelector('.timer_remaining-time');

function setTimer(totalTime) {
  timerRemainingTime.innerHTML = totalTime;
  timerObj.setTimer(totalTime);
}

setTimer(timerObj.startingTime);

function decrementTimeRemaining() {
  const currentTimeRemaining = timerRemainingTime.innerHTML;
  const timerMessageClass = timerMessage.getAttribute('class');
  if (timerMessageClass.includes('timer_message--paused')) {
    return;
  }
  if (currentTimeRemaining > 0) {
    setTimer(currentTimeRemaining - 1);
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

function decrementTimer() {
  decrementTimeRemaining();
  decrementProgressBar();
}

function startTimer() {
  setInterval(decrementTimer, timerObj.timerSpeed);
}

function beginTimer() {
  timerObj.updateMessage('Pause');
  timerMessage.innerHTML = 'Pause';
  timerMessage.classList.add('timer_message--active');
  startTimer();
}

function pauseTimer() {
  timerObj.updateMessage('Resume');
  timerMessage.innerHTML = 'Resume';
  timerMessage.classList.remove('timer_message--active');
  timerMessage.classList.add('timer_message--paused');
}

function resumeTimer() {
  timerObj.updateMessage('Pause');
  timerMessage.innerHTML = 'Pause';
  timerMessage.classList.remove('timer_message--paused');
  timerMessage.classList.add('timer_message--active');
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

timerMessage.innerHTML = 'Touch to Begin';
