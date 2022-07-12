import React from 'react';
import styles from './styles.module.scss';
import useInterval from '../../hooks/useInterval';
import secondsToTime from '../../utils/secondsToTime';
import Button from '../Button';

interface Props {
  defaultPomodoroTime: number;
}

const PomodoroTimer = (props: Props) => {
  const [mainTime, setMainTime] = React.useState(props.defaultPomodoroTime);

  useInterval(() => {
    setMainTime(mainTime - 1);
  }, 1000);

  return (
    <div className={styles.pomodoroContainer}>
      <h2>Você está: trabalhando</h2>
      <Button onClick={() => console.log('Cliquei')}>Botão</Button>
    </div>
  );
};

export default PomodoroTimer;
