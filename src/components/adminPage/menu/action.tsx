import React from 'react';
import styles from './menu.module.scss';
import { IActionProps } from '../../../types/components/menu';
import cn from 'classnames';

const Action: React.FC<IActionProps> = ({ active, children, ...props }) => {
  return (
    <div
      className={cn(styles.action, { [styles.activeAction]: active })}
      {...props}
    >
      {children}
    </div>
  );
};

export default Action;
