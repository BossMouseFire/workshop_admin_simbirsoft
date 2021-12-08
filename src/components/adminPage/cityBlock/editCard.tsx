import React, { useState } from 'react';
import styles from './cityBlock.module.scss';
import { CheckBox } from '../../ui';
import cn from 'classnames';
import { ICity } from '../../../types/actions/cities';
import { IPoint } from '../../../types/actions/points';

type Entry = ICity | IPoint;
interface IEditCard {
  entry: Entry;
  delArray?: string[];
  setDelArray?: React.Dispatch<React.SetStateAction<string[]>>;
}

export const EditCard: React.FC<IEditCard> = ({
  entry,
  delArray,
  setDelArray,
}) => {
  const [isChecked, setChecked] = useState<boolean>(true);

  const changeDelArray = () => {
    if (delArray) {
      let array: string[] = delArray;
      if (!isChecked) {
        array = array.filter((item) => item !== entry.id);
      } else {
        array.push(entry.id);
      }
      if (setDelArray) {
        setDelArray(array);
      }
    }
    setChecked((state) => !state);
  };
  return (
    <div className={styles.editCard}>
      <CheckBox checked={isChecked} onChange={changeDelArray} />
      {'address' in entry ? (
        <span className={cn({ [styles.delEntry]: !isChecked })}>
          {`${entry.name} (${entry.address})`}
        </span>
      ) : (
        <span className={cn({ [styles.delEntry]: !isChecked })}>
          {entry.name}
        </span>
      )}
    </div>
  );
};
