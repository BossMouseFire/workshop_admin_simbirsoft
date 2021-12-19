import React from 'react';
import styles from './select.module.scss';
import cn from 'classnames';
import { ISelect } from '../../../types/ui';

export const Select: React.FC<ISelect> = ({
  allPoints,
  data,
  className,
  sizeSelect,
  defaultSelectedId,
  ...props
}) => {
  return (
    <div
      className={cn(styles.select, {
        [styles.selectSize_10]: sizeSelect === '10',
        [styles.selectSize_auto]: sizeSelect === 'auto',
      })}
    >
      <select className={cn(className)} {...props}>
        <option disabled={true} selected={!defaultSelectedId}>
          Выберите пункт
        </option>
        {allPoints && <option value={''}>{allPoints}</option>}
        {data.map((item) => (
          <option
            key={item.id}
            value={item.id}
            selected={item.id === defaultSelectedId}
          >
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};
