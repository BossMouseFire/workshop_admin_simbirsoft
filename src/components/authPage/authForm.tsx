import React, { ChangeEvent, useRef, useState } from 'react';
import styles from './authPage.module.scss';
import { login } from '../../api/api';
const AuthForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const emailInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const onChangeMail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailInputRef.current.classList.contains(styles.errorInput)) {
      emailInputRef.current.classList.remove(styles.errorInput);
    }
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordInputRef.current.classList.contains(styles.errorInput)) {
      passwordInputRef.current.classList.remove(styles.errorInput);
    }
  };

  const onLogin = () => {
    if (!validateEmail(email)) {
      emailInputRef.current.classList.add(styles.errorInput);
    }
    if (!password) {
      passwordInputRef.current.classList.add(styles.errorInput);
    }
    if (validateEmail(email) && password) {
      login(email, password)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    }
  };
  return (
    <div className={styles.formAuth}>
      <span className={styles.formAuthName}>Вход</span>
      <div className={styles.blockInputData}>
        <span>Почта</span>
        <input
          placeholder={'Введите почту'}
          onChange={onChangeMail}
          ref={emailInputRef}
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
