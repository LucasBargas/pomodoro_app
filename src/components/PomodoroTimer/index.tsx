// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useEffect, useCallback } from 'react';
import styles from './styles.module.scss';
import useInterval from '../../hooks/useInterval';
import Button from '../Button';
import Timer from '../Timer';
import secondsToTime from '../../utils/secondsToTime';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellStart = require('../../sounds/bell-start.mp3');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellFinish = require('../../sounds/bell-finish.mp3');

const audioStartWorking = new Audio(bellStart);
const audioStopWorking = new Audio(bellFinish);

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

const PomodoroTimer = (props: Props): JSX.Element => {
  const [mainTime, setMainTime] = useState<number>(props.pomodoroTime);
  const [timeCounting, setTimeCounting] = useState<boolean>(false);
  const [working, setWorking] = useState<boolean>(false);
  const [resting, setResting] = useState<boolean>(false);
  const [cyclesQtdManager, setCyclesQtdManager] = useState<boolean[]>(
    new Array(props.cycles - 1).fill(true),
  );
  const [completedCycles, setCompletedCycles] = useState<number>(0);
  const [fullWorkingTime, setFullWorkingTime] = useState<number>(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = useState<number>(0);

  useInterval(
    (): void => {
      setMainTime(mainTime - 1);
      if (working) setFullWorkingTime(fullWorkingTime + 1);
    },
    timeCounting ? 1000 : null,
  );

  const configureWork = useCallback((): void => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMainTime(props.pomodoroTime);
    audioStartWorking.play();
  }, [props.pomodoroTime]);

  const configureRest = useCallback(
    (long: boolean): void => {
      setTimeCounting(true);
      setWorking(false);
      setResting(true);

      if (long) {
        setMainTime(props.longRestTime);
      } else {
        setMainTime(props.shortRestTime);
      }

      audioStopWorking.play();
    },
    [props.longRestTime, props.shortRestTime],
  );

  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');

    if (mainTime > 0) return;

    if (working && cyclesQtdManager.length > 0) {
      configureRest(false);
      cyclesQtdManager.pop();
    } else if (working && cyclesQtdManager.length <= 0) {
      configureRest(true);
      setCyclesQtdManager(new Array(props.cycles - 1).fill(true));
      setCompletedCycles(completedCycles + 1);
    }

    if (working) setNumberOfPomodoros(numberOfPomodoros + 1);
    if (resting) configureWork();
  }, [
    working,
    resting,
    mainTime,
    cyclesQtdManager,
    completedCycles,
    props.cycles,
    configureRest,
    configureWork,
  ]);

  return (
    <div className="pomodoro">
      <div className={styles.pomodoroContainer}>
        <h2>Você está: {working ? 'trabalhando' : 'descansando'}</h2>
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
            <strong>Ciclos concluídos:</strong> {completedCycles}
          </p>
          <p>
            <strong>Horas trabalhadas:</strong> {secondsToTime(fullWorkingTime)}
          </p>
          <p>
            <strong>Número de Pomodoros:</strong> {numberOfPomodoros}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
