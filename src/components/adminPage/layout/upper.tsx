import React from 'react';
import styles from './layout.module.scss';
interface IUpper {
  children?: React.ReactNode;
}

const Upper: React.FC<IUpper> = ({ children }) => {
  return <div className={styles.upper}>{children}</div>;
};

export default Upper;
