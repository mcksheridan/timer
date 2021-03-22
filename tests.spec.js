import Timer from './src/timer';

describe('Setting the timer', () => {
  const timerSetTime = new Timer();
  test('Shows the default time of 60 seconds', () => {
    expect(timerSetTime.remainingTime).toEqual(60);
  });
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
    expect(timerSetDecrease.progressPercent).toEqual(9);
  });
});
