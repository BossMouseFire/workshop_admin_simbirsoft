import React, { ChangeEvent, useEffect, useState } from 'react';
import Layout from '../layout/layout';
import Upper from '../layout/upper';
import Lower from '../layout/lower';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { useDispatch } from 'react-redux';
import { fetchCities } from '../../../store/actionCreators/cities';
import { Button, Select } from '../../ui';
import styles from './citiesBlock.module.scss';
import { fetchPointsForCity } from '../../../store/actionCreators/points';
import { Loader } from '../../other';
import FormLoader from '../layout/formLoader';
import InfoError from '../layout/infoError';

export const CitiesBlock: React.FC = () => {
  const dispatch = useDispatch();
  const [stateCity, setStateCity] = useState<string>('');
  const [firstStep, setFirstStep] = useState<boolean>(false);
  const { cities } = useTypeSelector((state) => state.cities);
  const { points, loading } = useTypeSelector((state) => state.points);

  useEffect(() => {
    dispatch(fetchCities());
  }, []);

  useEffect(() => {
    if (!firstStep) {
      dispatch(fetchPointsForCity(cities[0].id));
      setFirstStep(true);
    }
  }, [cities]);
  const onChangeCityId = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setStateCity(value);
  };

  const changeCity = () => {
    if (stateCity) {
      dispatch(fetchPointsForCity(stateCity));
    }
  };

  return (
    <Layout nameLayout={'Список городов'}>
      <Upper>
        <Select data={cities} onChange={onChangeCityId} />
        <Button size={'s'} color={'blue'} onClick={changeCity}>
          Применить
        </Button>
      </Upper>
      {cities.length !== 0 && points.length != 0 && (
        <div className={styles.citiesBlock}>
          <span className={styles.title}>
            Адреса пунктов в городе {points[0].cityId.name}
          </span>
          {points.length != 0 && (
            <div className={styles.points}>
              {points.map((point) => (
                <span key={point.id} className={styles.info}>
                  {point.address}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
      {loading && (
        <FormLoader>
          <Loader size={10} />
        </FormLoader>
      )}
      {!loading && !points.length && <InfoError />}
      <Lower />
    </Layout>
  );
};
