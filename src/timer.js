// eslint-disable-next-line import/extensions
import template from './timerHTML.js';

class Timer extends HTMLElement {
  constructor() {
    super(); // Call the constructor of HTMLElement
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.startingTime = this.getAttribute('time');
    this.timerSpeed = 1000;
    this.remainingTime = this.startingTime;
    this.state = 'Uninitialized';
    this.message = 'Touch to Begin';
    this.startingProgressPercent = 100;
    this.progressPercent = this.startingProgressPercent;
    this.decreasePerInterval = this.startingProgressPercent / this.startingTime;
  }

  connectedCallback() {
    const timerButton = this.querySelector('.timer-button_control');
    const timerRemainingTime = this.querySelector('.timer-bar_remaining-time');
    timerRemainingTime.innerHTML = this.startingTime;
    timerButton.innerHTML = 'Touch to Begin';
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
}

export default Timer;
