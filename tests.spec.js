import Timer from './src/timer';

describe('Setting the timer', () => {
  const timerSetTime = new Timer();
  it('Shows the default time of 60 seconds', () => {
    expect(timerSetTime.remainingTime).toEqual(60);
  });
  it('Updates the default time to 45 seconds', () => {
    timerSetTime.setTimer(45);
    expect(timerSetTime.remainingTime).toEqual(45);
  });
});
