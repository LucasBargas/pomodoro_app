import React from 'react';
import PomodoroTimer from '../../components/PomodoroTimer';

const Homepage = () => {
  return (
    <section>
      <PomodoroTimer defaultPomodoroTime={1500} />
    </section>
  );
};

export default Homepage;
