import React from 'react';
import styles from './otherComponents.module.scss';
import cn from 'classnames';

interface ILoader {
  size: number;
}

const Loader: React.FC<ILoader> = ({ size }) => {
  const getClassSize = () => {
    switch (size) {
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

export default Loader;
