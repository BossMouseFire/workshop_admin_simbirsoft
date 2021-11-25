import React from 'react';
import styles from './layout.module.scss';

const InfoError: React.FC = () => {
  return <div className={styles.infoAbsent}>Информация отсутствует</div>;
};

export default InfoError;
