import React, { Dispatch, SetStateAction, useState } from 'react';
import styles from './menu.module.scss';
import logo from '../../../assets/logo.svg';
import { ReactComponent as Pen } from '../../../assets/pen.svg';
import { ReactComponent as List } from '../../../assets/list.svg';
import { ReactComponent as Order } from '../../../assets/order.svg';
import cn from 'classnames';
import Action from './action';

interface IMenu {
  setSection: Dispatch<SetStateAction<number>>;
  activeSection: number;
}
export const Menu: React.FC<IMenu> = ({ setSection, activeSection }) => {
  const [isActive, setActive] = useState<boolean>(false);
  return (
    <>
      <div className={cn(styles.menu, { [styles.menuActive]: isActive })}>
        <div className={styles.head}>
          <img src={logo} alt={'Логотип'} />
          <span>Need for car</span>
          <div className={styles.closeCross} onClick={() => setActive(false)} />
        </div>
        <Action active={activeSection === 0} onClick={() => setSection(0)}>
          <Pen />
          <span>Карточка автомобиля</span>
        </Action>
        <Action active={activeSection === 1} onClick={() => setSection(1)}>
          <List />
          <span>Список авто</span>
        </Action>
        <Action active={activeSection === 2} onClick={() => setSection(2)}>
          <Order />
          <span>Заказы</span>
        </Action>
      </div>
      <div
        className={styles.buttonSetActiveMenu}
        onClick={() => setActive(true)}
      >
        <span />
      </div>
    </>
  );
};
