import React from 'react';
import secondsToTime from '../../utils/secondsToTime';
import styles from './styles.module.scss';

interface Props {
  mainTime: number;
}

const Timer = (props: Props) => {
  return <div className={styles.timer}>{secondsToTime(props.mainTime)}</div>;
};

export default Timer;
