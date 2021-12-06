import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Layout } from '../layout/layout';
import styles from './carBlock.module.scss';
import { Button, Input, Select } from '../../ui';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { ReactComponent as Plus } from '../../../assets/plus.svg';
export const CarBlock = () => {
  const { categories } = useTypeSelector((state) => state.categories);
  const refInputImg = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    // @ts-ignore
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    // @ts-ignore
    setSelectedFile(e.target.files[0]);
  };

  return (
    <Layout nameLayout={'Карточка автомобиля'}>
      <div className={styles.carBlock}>
        <div className={styles.carView}>
          <div className={styles.preview}>
            {preview && <img src={preview} />}
            {!preview && <div>Выберите изображение</div>}
          </div>
          <div className={styles.prevSpan}>
            <span>Название</span>
            <span>тип авто</span>
          </div>
          <Input
            isError={false}
            type={'file'}
            refInput={refInputImg}
            className={styles.inputFileBlock}
            accept={'image/*'}
            onChange={onSelectFile}
          />
          <div className={styles.description}>
            <span>Описание</span>
            <textarea></textarea>
          </div>
        </div>
        <div className={styles.carOptions}>
          <span className={styles.title}>Настройки автомобиля</span>
          <div className={styles.mainOptions}>
            <div>
              <span>Модель автомобиля</span>
              <Input
                isError={false}
                placeholder={'Введите название автомобиля'}
              />
            </div>
            <div>
              <span>Тип автомобиля</span>
              <Select data={categories} sizeSelect={'auto'} />
            </div>
          </div>
          <div className={styles.colorOptions}>
            <span>Доступные цвета</span>
            <div className={styles.colorButton}>
              <Input isError={false} placeholder={'Добавьте цвет'} />
              <div className={styles.addColor}>
                <Plus />
              </div>
            </div>
          </div>
          <div className={styles.colors}></div>
          <div className={styles.buttons}>
            <Button size={'s'} color={'blue'}>
              Сохранить
            </Button>
            <Button size={'s'}>Отменить</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
