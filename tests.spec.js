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
