import React from 'react';
import styles from './button.module.scss';
import cn from 'classnames';
import { IButton } from '../../../types/ui';

export const Button: React.FC<IButton> = ({
  color,
  size,
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(className, styles.button, {
        [styles.red]: color === 'red',
        [styles.blue]: color === 'blue',
        [styles.buttonSize_s]: size === 's',
        [styles.buttonSize_m]: size === 'm',
      })}
      {...props}
    >
      {children}
    </button>
  );
};
