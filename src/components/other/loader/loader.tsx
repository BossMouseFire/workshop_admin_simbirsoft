import React from 'react';
import styles from './loader.module.scss';
import cn from 'classnames';

interface ILoader {
  size: number;
}

export const Loader: React.FC<ILoader> = ({ size }) => {
  const getClassSize = () => {
    switch (size) {
      case 8:
        return styles.loaderSize_8;
      case 10:
        return styles.loaderSize_10;
    }
  };
  return (
    <div className={cn(styles.loader, getClassSize())}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};
