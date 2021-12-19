import React from 'react';
import styles from './layout.module.scss';

interface ILayout {
  children: React.ReactNode;
  nameLayout: string;
}

export const Layout: React.FC<ILayout> = ({ nameLayout, children }) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>{nameLayout}</span>
      {children}
    </div>
  );
};

export const LayoutTable: React.FC<ILayout> = ({ nameLayout, children }) => {
  return (
    <Layout nameLayout={nameLayout}>
      <div className={styles.block}>{children}</div>
    </Layout>
  );
};
