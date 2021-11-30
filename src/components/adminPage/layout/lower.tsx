import React from 'react';
import styles from './layout.module.scss';
interface ILower {
  children?: React.ReactNode;
}

const Lower: React.FC<ILower> = ({ children }) => {
  return <div className={styles.lower}>{children}</div>;
};

export default Lower;
