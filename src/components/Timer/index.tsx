// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import secondsToTime from '../../utils/secondsToMinutes';
import styles from './styles.module.scss';

interface Props {
  mainTime: number;
}

const Timer = (props: Props): JSX.Element => {
  return <div className={styles.timer}>{secondsToTime(props.mainTime)}</div>;
};

export default Timer;
