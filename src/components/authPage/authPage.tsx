import React from 'react';
import styles from './authPage.module.scss';
import logo from '../../assets/logo.svg';

const AuthPage: React.FC = () => {
  return (
    <div className={styles.authPage}>
      <div className={styles.blockAuth}>
        <div className={styles.blockName}>
          <img src={logo} alt={'Логотип'} />
          <span>Need for drive</span>
        </div>
        <div className={styles.formAuth}>
          <span className={styles.formAuthName}>Вход</span>
          <div className={styles.blockInputData}>
            <span>Почта</span>
            <input placeholder={'Введите почту'} />
          </div>
          <div className={styles.blockInputData}>
            <span>Пароль</span>
            <input type={'password'} placeholder={'Введите пароль'} />
          </div>
          <div className={styles.blockActions}>
            <div>Запросить доступ</div>
            <div>Войти</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
