import React from 'react';
import { ReactComponent as CheckGreen } from '../../../assets/checkGreen.svg';
import { ReactComponent as CrossRed } from '../../../assets/crossRed.svg';
import { ReactComponent as ThreePoint } from '../../../assets/threePoint.svg';
import styles from './buttonsBlock.module.scss';

export const ButtonsBlock: React.FC = () => {
  return (
    <div className={styles.buttonsBlock}>
      <button>
        <CheckGreen />
        Готово
      </button>
      <button>
        <CrossRed />
        Отмена
      </button>
      <button>
        <ThreePoint />
        Изменить
      </button>
    </div>
  );
};
