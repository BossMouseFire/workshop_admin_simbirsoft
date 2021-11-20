import React from 'react';
import styles from './select.module.scss';
import cn from 'classnames';
import { ISelect } from '../../../types/ui';

export const Select: React.FC<ISelect> = ({ data, className, ...props }) => {
  return (
    <div className={styles.select}>
      <select className={cn(className)} {...props}>
        <option value={''}>Все пункты</option>
        {data.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};
