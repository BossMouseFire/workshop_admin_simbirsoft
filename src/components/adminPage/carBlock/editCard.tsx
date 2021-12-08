import React from 'react';
import styles from './carBlock.module.scss';
import { CheckBox } from '../../ui';

interface IEditCard {
  color: string;
  colors?: string[];
  setColors?: React.Dispatch<React.SetStateAction<string[]>>;
}

export const EditCardColor: React.FC<IEditCard> = ({
  color,
  colors,
  setColors,
}) => {
  const changeDelArray = () => {
    if (colors) {
      let array: string[] = colors;
      array = array.filter((item) => item !== color);
      if (setColors) {
        setColors(array);
      }
    }
  };
  return (
    <div className={styles.colorCard}>
      <CheckBox checked={true} onChange={changeDelArray} />
      <span>{color}</span>
    </div>
  );
};
