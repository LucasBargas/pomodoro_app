import React from 'react';
import styles from './styles.module.scss';
import useInterval from '../../hooks/useInterval';
import Button from '../Button';
import Timer from '../Timer';

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

const PomodoroTimer = (props: Props): JSX.Element => {
  const [mainTime, setMainTime] = React.useState(props.pomodoroTime);
  const [timeCounting, setTimeCounting] = React.useState<boolean>(false);
  const [working, setWorking] = React.useState<boolean>(false);
  const [resting, setResting] = React.useState<boolean>(false);

  React.useEffect((): void => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');
  }, [working, resting]);

  useInterval(
    (): void => {
      setMainTime(mainTime - 1);
    },
    timeCounting ? 1000 : null,
  );

  const configureWork = (): void => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMainTime(props.pomodoroTime);
  };

  const configureRest = (long: boolean): void => {
    setTimeCounting(true);
    setWorking(false);
    setResting(true);

    if (long) {
      setMainTime(props.longRestTime);
    } else {
      setMainTime(props.shortRestTime);
    }
  };

  return (
    <div className="pomodoro">
      <div className={styles.pomodoroContainer}>
        <h2>Você está: trabalhando</h2>
        <Timer mainTime={mainTime} />

        <div className={styles.buttonsRow}>
          <Button className={styles.button} onClick={configureWork}>
            Trabalhar
          </Button>

          <Button
            className={`${styles.button} ${
              !working && !resting ? 'hidden' : ''
            }`}
            onClick={() => configureRest(false)}
          >
            Descansar
          </Button>

          <Button
            className={styles.button}
            onClick={() => setTimeCounting(!timeCounting)}
          >
            {timeCounting ? 'Pausar' : 'Iniciar'}
          </Button>
        </div>

        <div className={styles.pomodoroDetails}>
          <p>
            <strong>Testando:</strong> fkojfrofgiregoh
          </p>
          <p>
            <strong>Testando:</strong> fkojfrofgiregoh
          </p>
          <p>
            <strong>Testando:</strong> fkojfrofgiregoh
          </p>
          <p>
            <strong>Testando:</strong> fkojfrofgiregoh
          </p>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
