import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Layout } from '../layout/layout';
import styles from './carBlock.module.scss';
import { Button, Input, Select } from '../../ui';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { ReactComponent as Plus } from '../../../assets/plus.svg';
import { useDispatch } from 'react-redux';
import { fetchCategories } from '../../../store/actionCreators/categories';
import { ICategory } from '../../../types/actions/categories';
export const CarBlock = () => {
  const { categories } = useTypeSelector((state) => state.categories);
  const dispatch = useDispatch();
  const refInputImg = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [nameCar, setNameCar] = useState('Название');
  const [typeCar, setTypeCar] = useState<ICategory>();
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

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

  const changeTypeCar = (e: ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    if (categories.length) {
      categories.map((category) => {
        if (category.id === id) {
          setTypeCar(category);
        }
      });
    }
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
            <span>{nameCar}</span>
            <span>{typeCar?.name}</span>
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
            <textarea
              defaultValue={description}
              onChange={(e) => setDescription(e.target.value)}
            />
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
                onChange={(e) => setNameCar(e.target.value)}
              />
            </div>
            <div>
              <span>Тип автомобиля</span>
              <Select
                data={categories}
                sizeSelect={'auto'}
                onChange={changeTypeCar}
              />
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
