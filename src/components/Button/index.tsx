// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

interface Props {
  children: string;
  onClick: () => void;
  className?: string;
}

const Button = (props: Props): JSX.Element => {
  return (
    <button className={props.className} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
