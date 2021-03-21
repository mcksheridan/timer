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

export default Timer;
