import React, { useState } from 'react';
import styles from './navbar.module.scss';
import cn from 'classnames';
import { ReactComponent as Loupe } from '../../../assets/loupe.svg';
import { ReactComponent as Notices } from '../../../assets/notices.svg';
import dropArrow from '../../../assets/dropdown.svg';
import anonim from '../../../assets/anonim.svg';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { Button } from '../../ui';

export const Navbar: React.FC = () => {
  const { dataAuth } = useTypeSelector((state) => state.auth);
  const [isDropDown, setIsDropDown] = useState<boolean>(false);
  return (
    <div className={styles.navbar}>
      <div className={styles.search}>
        <Loupe />
        <input placeholder={'Поиск ...'} />
      </div>
      <div className={styles.notices}>
        <Notices />
      </div>
      <div className={styles.profile}>
        <div className={styles.picture}>
          <img src={anonim} alt={'аноним'} />
        </div>
        <span>
          {dataAuth.username[0].toUpperCase() + dataAuth.username.slice(1)}
        </span>
        <div
          className={cn(styles.dropArrow, {
            [styles.activeDropArrow]: isDropDown,
          })}
          onClick={() => setIsDropDown((state) => !state)}
        >
          <img src={dropArrow} alt={'стрелка'} />
        </div>
        <div
          className={cn(styles.profileUpper, {
            [styles.activeProfileUpper]: isDropDown,
          })}
        >
          <Button color={'blue'}>Выйти</Button>
        </div>
      </div>
    </div>
  );
};
