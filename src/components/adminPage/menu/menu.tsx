import React from 'react';
import styles from './menu.module.scss';
import logo from '../../../assets/logo.svg';
const Menu: React.FC = () => {
  return (
    <div className={styles.menu}>
      <div className={styles.head}>
        <img src={logo} alt={'Логотип'} />
        <span>Need for car</span>
      </div>
      <div></div>
    </div>
  );
};

export default Menu;
