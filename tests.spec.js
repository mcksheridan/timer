import Timer from './src/timer';

describe('Setting the timer', () => {
  const timerSetTime = new Timer();
  test('Updates the default time to 45 seconds', () => {
    timerSetTime.setTimer(45);
    expect(timerSetTime.remainingTime).toEqual(45);
  });
});

describe('Updating the timer message', () => {
  const timerSetMessage = new Timer();
  test('Shows the default message on the timer is "Touch to Begin"', () => {
    expect(timerSetMessage.message).toBe('Touch to Begin');
  });
  test('Updates the timer message to "Pause"', () => {
    timerSetMessage.updateMessage('Pause');
    expect(timerSetMessage.message).toBe('Pause');
  });
});

describe('Updating the timer\'s state', () => {
  const timerSetState = new Timer();
  test('Show the timer\'s default state', () => {
    expect(timerSetState.state).toBe('Uninitialized');
  });
  test('Update the timer\'s state to active', () => {
    timerSetState.updateState('Active');
    expect(timerSetState.state).toBe('Active');
  });
});

describe('Updating the progress percentage', () => {
  const timerSetProgressPercentage = new Timer();
  test('Show the timer\'s full, starting progress percentage', () => {
    expect(timerSetProgressPercentage.progressPercent).toEqual(100);
  });
  test('Update the timer\'s progress percentage to 85%', () => {
    timerSetProgressPercentage.updateProgressPercent(85);
    expect(timerSetProgressPercentage.progressPercent).toEqual(85);
  });
  test('Restore the timer progress percent to the original value', () => {
    timerSetProgressPercentage.updateProgressPercent(
      timerSetProgressPercentage.startingProgressPercent,
    );
    expect(timerSetProgressPercentage.progressPercent)
      .toEqual(timerSetProgressPercentage.startingProgressPercent);
  });
});

describe('Using a decreasePerInterval to decrement the progress percentage', () => {
  const timerSetDecrease = new Timer();
  timerSetDecrease.updateStartingTime(10);
  test('Show the timer\'s default decrease per interval', () => {
    expect(timerSetDecrease.decreasePerInterval).toEqual(10);
  });
  test('Decrease the timer by the default decrease per interval', () => {
    timerSetDecrease.decrementProgressPercent();
    expect(timerSetDecrease.progressPercent).toEqual(90);
  });
});

describe('Decrement time remaining on the timer', () => {
  const timerDecrementTime = new Timer();
  timerDecrementTime.remainingTime = 30;
  test('Decrease the remaining time by 1', () => {
    timerDecrementTime.decrementTimeRemaining();
    expect(timerDecrementTime.remainingTime).toEqual(29);
  });
  test('Do not decrement time when the timer is paused', () => {
    timerDecrementTime.state = 'Paused';
    timerDecrementTime.decrementTimeRemaining();
    expect(timerDecrementTime.remainingTime).toEqual(29);
  });
});

describe('Decrement progress bar on the timer', () => {
  const timerDecrementProgress = new Timer();
  timerDecrementProgress.updateStartingTime(10);
  test('Decrement progress bar by ten percent', () => {
    timerDecrementProgress.decrementProgressBar();
    expect(timerDecrementProgress.progressPercent).toEqual(90);
  });
  test('Do not decrement progress bar when timer is paused', () => {
    timerDecrementProgress.state = 'Paused';
    timerDecrementProgress.decrementProgressBar();
    expect(timerDecrementProgress.progressPercent).toEqual(90);
  });
  test('Decrease progress bar to zero when time remaining is equal to/greater than zero but less than the decrease per interval value', () => {
    timerDecrementProgress.state = 'Active';
    timerDecrementProgress.progressPercent = 9;
    timerDecrementProgress.decrementProgressBar();
    expect(timerDecrementProgress.progressPercent).toEqual(0);
  });
});
