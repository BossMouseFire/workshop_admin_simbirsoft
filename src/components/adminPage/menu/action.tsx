import React from 'react';
import styles from './menu.module.scss';
import { IActionProps } from '../../../types/components/menu';

const Action: React.FC<IActionProps> = ({ children }) => {
  return <div className={styles.action}>{children}</div>;
};

export default Action;
