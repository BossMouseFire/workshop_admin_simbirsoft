import React, { useRef } from 'react';
import styles from './authPage.module.scss';
import logo from '../../assets/logo.svg';
import AuthForm from './authForm';

const AuthPage: React.FC = () => {
  const errorRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  return (
    <div className={styles.authPage}>
      <div className={styles.blockAuth}>
        <div className={styles.blockName}>
          <img src={logo} alt={'Логотип'} />
          <span>Need for drive</span>
        </div>
        <AuthForm errorRef={errorRef} />
      </div>
      <div className={styles.errorAuth} ref={errorRef}>
        Произола ошибка при авторизации. Проверьте данные и попробуйте заново.
      </div>
    </div>
  );
};

export default AuthPage;
