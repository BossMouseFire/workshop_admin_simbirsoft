import React from 'react';
import styles from './authPage.module.scss';
import logo from '../../assets/logo.svg';
import AuthForm from './authForm';

const AuthPage: React.FC = () => {
  return (
    <div className={styles.authPage}>
      <div className={styles.blockAuth}>
        <div className={styles.blockName}>
          <img src={logo} alt={'Логотип'} />
          <span>Need for drive</span>
        </div>
        <AuthForm />
      </div>
    </div>
  );
};

export default AuthPage;
