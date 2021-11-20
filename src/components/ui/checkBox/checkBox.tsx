import React from 'react';
import styles from './checkBox.module.scss';
import { ICheckBox } from '../../../types/ui';
import cn from 'classnames';

export const CheckBox: React.FC<ICheckBox> = ({ className, ...props }) => {
  return (
    <input
      type={'checkbox'}
      className={cn(styles.input, className)}
      {...props}
    />
  );
};
