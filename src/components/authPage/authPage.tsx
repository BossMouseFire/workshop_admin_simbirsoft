import React from 'react';
import styles from './authPage.module.scss';
import logo from '../../assets/logo.svg';
import AuthForm from './authForm';
import cn from 'classnames';
import cnBind from 'classnames/bind';
import { useTypeSelector } from '../../hooks/useTypeSelector';
const cx = cnBind.bind(styles);

const AuthPage: React.FC = () => {
  const { error } = useTypeSelector((state) => state.auth);
  return (
    <div className={styles.authPage}>
      <div className={styles.blockAuth}>
        <div className={styles.blockName}>
          <img src={logo} alt={'Логотип'} />
          <span>Need for drive</span>
        </div>
        <AuthForm />
      </div>
      <div className={cn(styles.errorAuth, cx({ errorAuthActive: error }))}>
        Произола ошибка при авторизации. Проверьте данные и попробуйте заново.
      </div>
    </div>
  );
};

export default AuthPage;
