// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import PomodoroTimer from '../../components/PomodoroTimer';

const Homepage = (): JSX.Element => {
  return (
    <section>
      <PomodoroTimer
        pomodoroTime={1500} // 25min
        shortRestTime={300} // 5min - For each pomodoro one shortRestTime
        longRestTime={900} // 15min
        cycles={4} // For each end of cycle one longRestTime
      />
    </section>
  );
};

export default Homepage;
