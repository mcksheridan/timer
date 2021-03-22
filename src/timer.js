class Timer {
  constructor() {
    this.startingTime = 60;
    this.timerSpeed = 100;
    this.remainingTime = this.startingTime;
    this.state = 'Uninitialized';
    this.message = 'Touch to Begin';
    this.startingProgressPercent = 100;
    this.progressPercent = this.startingProgressPercent;
  }

  setTimer(time) {
    this.remainingTime = time;
  }

  updateState(state) {
    this.state = state;
  }

  updateMessage(message) {
    this.message = message;
  }

  updateProgressPercent(percent) {
    this.progressPercent = percent;
  }
}

export default Timer;
