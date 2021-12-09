import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './alert.module.scss';
interface IAlert
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  type: 'info' | 'error';
  children: React.ReactNode;
  visible: boolean;
}

export const Alert: React.FC<IAlert> = ({
  visible,
  type,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(styles.alert, {
        [styles.info]: type === 'info',
        [styles.error]: type === 'error',
        [styles.alertActive]: visible,
      })}
      {...props}
    >
      {children}
    </div>
  );
};
