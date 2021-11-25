import React from 'react';
import styles from './layout.module.scss';

interface IFormLoader {
  children: React.ReactNode;
}

const FormLoader: React.FC<IFormLoader> = ({ children }) => {
  return <div className={styles.formLoader}>{children}</div>;
};

export default FormLoader;
