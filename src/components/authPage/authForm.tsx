import React, { ChangeEvent, useRef, useState } from 'react';
import styles from './authPage.module.scss';
import { login } from '../../api/api';
import { setCookie } from '../../utils/utils';
import { useHistory } from 'react-router-dom';

interface IAuthForm {
  errorRef: React.MutableRefObject<HTMLInputElement>;
}

const AuthForm: React.FC<IAuthForm> = ({ errorRef }) => {
  const [loginLocal, setLoginLocal] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const loginLocalInputRef =
    useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const history = useHistory();

  const onChangeMail = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginLocal(e.target.value);
    if (loginLocalInputRef.current.classList.contains(styles.errorInput)) {
      loginLocalInputRef.current.classList.remove(styles.errorInput);
    }
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordInputRef.current.classList.contains(styles.errorInput)) {
      passwordInputRef.current.classList.remove(styles.errorInput);
    }
  };

  const onLogin = () => {
    if (!loginLocal) {
      loginLocalInputRef.current.classList.add(styles.errorInput);
    }
    if (!password) {
      passwordInputRef.current.classList.add(styles.errorInput);
    }
    if (loginLocal && password) {
      login(loginLocal, password)
        .then((response) => {
          const typeToken =
            response.data.token_type[0].toUpperCase() +
            response.data.token_type.slice(1);
          const token = `${typeToken} ${response.data.access_token}`;
          setCookie('accessToken', token);
          history.go(0);
        })
        .catch(() => {
          errorRef.current.classList.add(styles.errorAuthActive);
          loginLocalInputRef.current.classList.add(styles.errorInput);
          passwordInputRef.current.classList.add(styles.errorInput);
        });
    }
  };
  return (
    <div className={styles.formAuth}>
      <span className={styles.formAuthName}>Вход</span>
      <div className={styles.blockInputData}>
        <span>Логин</span>
        <input
          placeholder={'Введите почту'}
          onChange={onChangeMail}
          ref={loginLocalInputRef}
        />
      </div>
      <div className={styles.blockInputData}>
        <span>Пароль</span>
        <input
          type={'password'}
          placeholder={'Введите пароль'}
          onChange={onChangePassword}
          ref={passwordInputRef}
        />
      </div>
      <div className={styles.blockActions}>
        <div>Запросить доступ</div>
        <div onClick={onLogin}>Войти</div>
      </div>
    </div>
  );
};

export default AuthForm;
