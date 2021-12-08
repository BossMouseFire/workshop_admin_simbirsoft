import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Layout } from '../layout/layout';
import styles from './carBlock.module.scss';
import { Button, Input, Select } from '../../ui';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { ReactComponent as Plus } from '../../../assets/plus.svg';
import { useDispatch } from 'react-redux';
import { fetchCategories } from '../../../store/actionCreators/categories';
import { ICategory } from '../../../types/actions/categories';
import { EditCardColor } from './editCard';
export const CarBlock = () => {
  const { categories } = useTypeSelector((state) => state.categories);
  const dispatch = useDispatch();
  const refInputImg = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [nameCar, setNameCar] = useState('Название');
  const [typeCar, setTypeCar] = useState<ICategory>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [maxPrice, setMaxPrice] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [minPrice, setMinPrice] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [number, setNumber] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [colors, setColors] = useState<string[]>([]);
  const [stateColor, setStateColor] = useState<string>('');

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

  const changeMaxPrice = (e: ChangeEvent<HTMLInputElement>) => {
    const price = Number(e.target.value);
    if (!isNaN(price)) {
      setMaxPrice(price);
    }
  };

  const changeMinPrice = (e: ChangeEvent<HTMLInputElement>) => {
    const price = Number(e.target.value);
    if (!isNaN(price)) {
      setMinPrice(price);
    }
  };

  const addColor = () => {
    if (stateColor) {
      setColors([...colors, stateColor]);
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
                placeholder={'Модель'}
                onChange={(e) => setNameCar(e.target.value)}
              />
            </div>
            <div>
              <span>Номер</span>
              <Input
                isError={false}
                placeholder={'Номер'}
                onChange={(e) => setNumber(e.target.value)}
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
            <div>
              <span>Доступные цвета</span>
              <div className={styles.colorButton}>
                <Input
                  isError={false}
                  placeholder={'Добавьте цвет'}
                  onChange={(e) => setStateColor(e.target.value)}
                />
                <div className={styles.addColor} onClick={addColor}>
                  <Plus />
                </div>
              </div>
            </div>
            <div>
              <span>Мин. стоимость</span>
              <Input
                isError={false}
                placeholder={'Значение'}
                value={minPrice}
                onChange={changeMinPrice}
              />
            </div>
            <div>
              <span>Макс. стоимость</span>
              <Input
                isError={false}
                placeholder={'Значение'}
                value={maxPrice}
                onChange={changeMaxPrice}
              />
            </div>
          </div>
          <div className={styles.colors}>
            {colors.map((color, index) => (
              <EditCardColor
                color={color}
                colors={colors}
                setColors={setColors}
                key={index}
              />
            ))}
          </div>
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
