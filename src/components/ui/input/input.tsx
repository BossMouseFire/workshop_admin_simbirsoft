import React from 'react';
import styles from './input.module.scss';
import cn from 'classnames';
import { IInput } from '../../../types/ui';

export const Input: React.FC<IInput> = ({
  isError,
  className,
  type,
  refInput,
  ...props
}) => {
  const getInput = () => {
    switch (type) {
      case 'file':
        return (
          <div className={cn(className, styles.inputFileBlock)}>
            <input
              id={'file'}
              name={'file'}
              type={type}
              className={styles.inputFile}
              ref={refInput}
              {...props}
            />
            <label htmlFor={'file'}>Выберите файл</label>
          </div>
        );
      default:
        return (
          <input
            className={cn(styles.input, className, {
              [styles.errorInput]: isError,
            })}
            type={type}
            {...props}
          />
        );
    }
  };

  return getInput();
};
