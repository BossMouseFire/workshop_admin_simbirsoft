import React from 'react';
import styles from './footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.urls}>
        <a href={'/admin'}>Главная страница</a>
      </div>
      <div className={styles.about}>Copyright © 2020 SimbirSoft</div>
    </div>
  );
};
