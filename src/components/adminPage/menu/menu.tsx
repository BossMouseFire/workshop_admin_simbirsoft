import React from 'react';
import styles from './menu.module.scss';
import logo from '../../../assets/logo.svg';
import { ReactComponent as Pen } from '../../../assets/pen.svg';
import { ReactComponent as List } from '../../../assets/list.svg';
import { ReactComponent as Order } from '../../../assets/order.svg';
import Action from './action';
const Menu: React.FC = () => {
  return (
    <div className={styles.menu}>
      <div className={styles.head}>
        <img src={logo} alt={'Логотип'} />
        <span>Need for car</span>
      </div>
      <Action>
        <Pen />
        <span>Карточка автомобиля</span>
      </Action>
      <Action>
        <List />
        <span>Список авто</span>
      </Action>
      <Action>
        <Order />
        <span>Заказы</span>
      </Action>
    </div>
  );
};

export default Menu;
