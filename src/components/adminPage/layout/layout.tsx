import React from 'react';
import styles from './layout.module.scss';

interface ILayout {
  children: React.ReactNode;
  nameLayout: string;
}

const Layout: React.FC<ILayout> = ({ nameLayout, children }) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>{nameLayout}</span>
      <div className={styles.block}>{children}</div>
    </div>
  );
};

export default Layout;
