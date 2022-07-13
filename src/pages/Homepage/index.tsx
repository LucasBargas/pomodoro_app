import React from 'react';
import PomodoroTimer from '../../components/PomodoroTimer';

const Homepage = (): JSX.Element => {
  return (
    <section>
      <PomodoroTimer
        pomodoroTime={1500}
        shortRestTime={300}
        longRestTime={900}
        cycles={4}
      />
    </section>
  );
};

export default Homepage;
