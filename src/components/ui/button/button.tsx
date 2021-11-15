import React from 'react';
import styles from './button.module.scss';
import cn from 'classnames';
import { IButton } from '../../../types/ui';

export const Button: React.FC<IButton> = ({
  color,
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(className, styles.button, {
        [styles.red]: color === 'red',
        [styles.blue]: color === 'blue',
      })}
      {...props}
    >
      {children}
    </button>
  );
};
