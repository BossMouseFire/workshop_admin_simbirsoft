import React, { ChangeEvent, useEffect, useState } from 'react';
import Layout from '../layout/layout';
import Upper from '../layout/upper';
import Lower from '../layout/lower';
import styles from './carsBlock.module.scss';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { convertUrlImg } from '../../../utils/utils';
import { useDispatch } from 'react-redux';
import {
  fetchCars,
  fetchCarsByParams,
} from '../../../store/actionCreators/cars';
import Pagination from '../pagination/pagination';
import { Loader } from '../../other';
import { Button, Select } from '../../ui';
import { fetchCategories } from '../../../store/actionCreators/categories';
import FormLoader from '../layout/formLoader';
import InfoError from '../layout/infoError';

export const CarsBlock = () => {
  const dispatch = useDispatch();
  const { cars, maxCount, loading } = useTypeSelector((state) => state.cars);
  const { categories } = useTypeSelector((state) => state.categories);
  const [isRefresh, setIsRefresh] = useState<boolean>(true);
  const [stateCategory, setStateCategory] = useState<string | undefined>(
    undefined
  );
  const limit = 4;
  useEffect(() => {
    dispatch(fetchCars(0, limit));
    dispatch(fetchCategories());
  }, []);

  const changeCars = (newPage: number) => {
    dispatch(fetchCarsByParams(newPage, limit, stateCategory));
  };

  const onChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!value) {
      setStateCategory(undefined);
    } else {
      setStateCategory(value);
    }
  };

  const refreshCars = () => {
    setIsRefresh((state) => !state);
  };

  const cancelChange = () => {
    setStateCategory(undefined);
    refreshCars();
  };

  return (
    <Layout nameLayout={'Список авто'}>
      <Upper>
        <Select
          data={categories}
          onChange={onChangeCategory}
          allPoints={'Все категории'}
        />
        <Button size={'s'} color={'red'} onClick={cancelChange}>
          Сбросить
        </Button>
        <Button size={'s'} color={'blue'} onClick={refreshCars}>
          Применить
        </Button>
      </Upper>

      {cars.length !== 0 && (
        <div className={styles.carsBlock}>
          <div className={styles.titleBlock}>
            <span>Категория</span>
            <span>Марка</span>
            <span>Номер</span>
            <span>Цена от</span>
            <span>Цена до</span>
            <span>Цвета</span>
            <span>Изображение</span>
          </div>
          {cars.map((car) => (
            <div className={styles.cardCar} key={car.id}>
              <span>{car.categoryId?.name ? car.categoryId?.name : '-'}</span>
              <span>{car.name}</span>
              <span>{car.number ? car.number : '-'}</span>
              <span>{car.priceMin}р</span>
              <span>{car.priceMax}р</span>
              <span>{car.colors.join(', ')}</span>
              <div>
                <img src={convertUrlImg(car.thumbnail.path)} />
              </div>
            </div>
          ))}
        </div>
      )}

      {loading && (
        <FormLoader>
          <Loader size={10} />
        </FormLoader>
      )}
      {!loading && !cars.length && <InfoError />}

      <Lower>
        <Pagination
          entities={cars}
          changeEntities={changeCars}
          limit={limit}
          maxCount={maxCount}
          isRefresh={isRefresh}
        />
      </Lower>
    </Layout>
  );
};
