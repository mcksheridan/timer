class Timer {
  constructor() {
    this.startingTime = 60;
    this.timerSpeed = 1000;
    this.remainingTime = this.startingTime;
    this.state = 'Uninitialized';
    this.message = 'Touch to Begin';
    this.startingProgressPercent = 100;
    this.progressPercent = this.startingProgressPercent;
    this.decreasePerInterval = this.startingProgressPercent / this.startingTime;
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
