import React from 'react';
import styles from './input.module.scss';
import cn from 'classnames';
import { IInput } from '../../../types/ui';

export const Input: React.FC<IInput> = ({ isError, className, ...props }) => {
  return (
    <input
      className={cn(styles.input, className, { [styles.errorInput]: isError })}
      {...props}
    />
  );
};
