import React from 'react';
import styles from './errorBlock.module.scss';

export const ErrorBlock: React.FC = () => {
  return (
    <div className={styles.errorBlock}>
      <span>500</span>
      <span>Что-то пошло не так</span>
      <span>Попробуйте перезагрузить страницу</span>
    </div>
  );
};
