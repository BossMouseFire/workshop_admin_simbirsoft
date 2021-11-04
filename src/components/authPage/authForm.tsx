import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './authPage.module.scss';
import { useDispatch } from 'react-redux';
import { login } from '../../store/actionCreators/auth';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import cn from 'classnames';
import cnBind from 'classnames/bind';
import Loader from '../loader/loader';
const cx = cnBind.bind(styles);

const AuthForm: React.FC = () => {
  const [loginLocal, setLoginLocal] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginStateError, setLoginStateError] = useState<boolean>(false);
  const [passwordStateError, setPasswordStateError] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { loading, error } = useTypeSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      setLoginStateError(true);
      setPasswordStateError(true);
    }
  }, [error]);

  const onChangeMail = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginLocal(e.target.value);
    if (loginStateError) {
      setLoginStateError(false);
    }
  };
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordStateError) {
      setPasswordStateError(false);
    }
  };

  const onLogin = () => {
    if (!loginLocal) {
      setLoginStateError(true);
    }
    if (!password) {
      setPasswordStateError(true);
    }
    if (loginLocal && password) {
      dispatch(login(loginLocal, password));
    }
  };
  return (
    <div className={styles.formAuth}>
      <span className={styles.formAuthName}>Вход</span>
      <div className={styles.blockInputData}>
        <span>Логин</span>
        <input
          placeholder={'Введите логин'}
          className={cn(cx({ errorInput: loginStateError }))}
          onChange={onChangeMail}
        />
      </div>
      <div className={styles.blockInputData}>
        <span>Пароль</span>
        <input
          type={'password'}
          placeholder={'Введите пароль'}
          className={cn(cx({ errorInput: passwordStateError }))}
          onChange={onChangePassword}
        />
      </div>
      <div className={styles.blockActions}>
        <div>Запросить доступ</div>
        <div
          className={cn(cx({ disableButtonLogin: loading }))}
          onClick={onLogin}
        >
          Войти
        </div>
      </div>
      {loading && (
        <div className={styles.formAuthLoading}>
          <Loader size={10} />
        </div>
      )}
    </div>
  );
};

export default AuthForm;
