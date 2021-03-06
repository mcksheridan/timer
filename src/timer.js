const template = `
      <header class="timer-header">
        <h2><span class="timer-header_seconds"></span> Second Timer</h2>
      </header>

      <main>
        <svg class="timer-bar" width="90vw" height="2.5rem">
          <rect class="timer-bar_background" width="100%" height="40" />
          <rect class="timer-bar_progress" width="100%" height="40" />
          <text class="timer-bar_remaining-time" x="1%" y="60%">0</text>
        </svg>
      </main>

      <footer class="timer-button">
          <button type="button" class="timer-button_control">Loading...</button>
      </footer>
`;

class Timer extends HTMLElement {
  constructor() {
    super(); // Call the constructor of HTMLElement
    this.innerHTML = template;
    this.state = 'Uninitialized';
    this.startingTime = this.getAttribute('time');
    this.timerSpeed = 1000;
    this.remainingTime = this.startingTime;
    this.message = 'Touch to Begin';
    this.startingProgressPercent = 100;
    this.progressPercent = this.startingProgressPercent;
    this.decreasePerInterval = this.startingProgressPercent / this.startingTime;
    this.interval = undefined;
  }

  connectedCallback() {
    const timerRemainingTime = this.querySelector('.timer-bar_remaining-time');
    const timerButton = this.querySelector('.timer-button_control');
    const timerHeaderSeconds = this.querySelector('.timer-header_seconds');
    timerRemainingTime.innerHTML = this.startingTime;
    timerButton.innerHTML = 'Touch to Begin';
    timerHeaderSeconds.innerText = this.startingTime;
    timerButton.addEventListener('click', () => {
      if (this.state === 'Uninitialized') {
        this.beginTimer();
        return;
      }
      if (this.state === 'Active') {
        this.pauseTimer();
        return;
      }
      if (this.state === 'Paused') {
        this.resumeTimer();
      }
      if (this.state === 'Finished') {
        this.resetTimer();
        clearInterval(this.interval);
        this.beginTimer();
      }
    });
  }

  setTimer(time) {
    this.remainingTime = time;
  }

  // When changing the starting time, you must also change all properties
  // that are dependent on the starting time.
  recalculateValues() {
    this.remainingTime = this.startingTime;
    this.decreasePerInterval = this.startingProgressPercent / this.startingTime;
  }

  updateStartingTime(time) {
    this.startingTime = time;
    this.recalculateValues();
  }

  updateState(state) {
    this.state = state;
  }

  updateMessage(message) {
    this.message = message;
  }

  allowRestart() {
    if (this.remainingTime === 0) {
      this.state = 'Finished';
      this.message = 'Restart';
    }
  }

  decrementTimeRemaining() {
    if (this.state === 'Paused') {
      return;
    }
    if (this.remainingTime > 0) {
      this.setTimer(this.remainingTime - 1);
    }
  }

  updateProgressPercent(percent) {
    this.progressPercent = percent;
  }

  decrementProgressPercent() {
    this.updateProgressPercent(this.progressPercent - this.decreasePerInterval);
  }

  decrementProgressBar() {
    if (this.state === 'Paused') {
      return;
    }
    if (this.progressPercent > this.decreasePerInterval) {
      this.decrementProgressPercent();
      return;
    }
    if (this.progressPercent >= 0) {
      this.updateProgressPercent(0);
    }
  }

  decrementTimer() {
    this.allowRestart();
    this.decrementTimeRemaining();
    this.decrementProgressBar();
    this.updateTimerUI();
  }

  updateTimerUI() {
    const timerRemainingTime = this.querySelector('.timer-bar_remaining-time');
    const timerButton = this.querySelector('.timer-button_control');
    const timerProgressBar = this.querySelector('.timer-bar_progress');
    timerRemainingTime.innerHTML = this.remainingTime;
    timerButton.innerHTML = this.message;
    timerProgressBar.setAttribute('width', `${this.progressPercent}%`);
    // Update timer class
    if (this.state === 'Active') {
      timerButton.classList.add('timer_message--active');
      timerButton.classList.remove('timer_message--paused');
    }
    if (this.state === 'Paused') {
      timerButton.classList.remove('timer_message--active');
      timerButton.classList.add('timer_message--paused');
    }
  }

  initializeTimer() {
    this.interval = setInterval(this.decrementTimer.bind(this), this.timerSpeed);
  }

  beginTimer() {
    this.updateState('Active');
    this.updateMessage('Pause');
    this.initializeTimer();
    this.updateTimerUI();
  }

  pauseTimer() {
    this.updateState('Paused');
    this.updateMessage('Resume');
    this.updateTimerUI();
  }

  resumeTimer() {
    this.updateState('Active');
    this.updateMessage('Pause');
    this.updateTimerUI();
  }

  resetTimer() {
    this.remainingTime = this.startingTime;
    this.progressPercent = this.startingProgressPercent;
  }
}

export default Timer;

window.customElements.define('timer-object', Timer);
