import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './authForm.module.scss';
import { useDispatch } from 'react-redux';
import { login } from '../../../store/actionCreators/auth';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import cn from 'classnames';
import cnBind from 'classnames/bind';
import { Loader } from '../../other/';
import { Button, Input } from '../../ui/';
const cx = cnBind.bind(styles);

export const AuthForm: React.FC = () => {
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
        <Input
          isError={loginStateError}
          placeholder={'Введите логин'}
          onChange={onChangeMail}
        />
      </div>
      <div className={styles.blockInputData}>
        <span>Пароль</span>
        <Input
          isError={passwordStateError}
          type={'password'}
          placeholder={'Введите пароль'}
          onChange={onChangePassword}
        />
      </div>
      <div className={styles.blockActions}>
        <div>Запросить доступ</div>
        <Button
          className={cn(cx({ disableButtonLogin: loading }))}
          color={'blue'}
          onClick={onLogin}
        >
          Войти
        </Button>
      </div>
      {loading && (
        <div className={styles.formAuthLoading}>
          <Loader size={10} />
        </div>
      )}
    </div>
  );
};
