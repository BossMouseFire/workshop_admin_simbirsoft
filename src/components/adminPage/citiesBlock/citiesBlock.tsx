import React, { ChangeEvent, useEffect, useState } from 'react';
import Layout from '../layout/layout';
import Upper from '../layout/upper';
import Lower from '../layout/lower';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { useDispatch } from 'react-redux';
import { fetchCities } from '../../../store/actionCreators/cities';
import { Button, Select } from '../../ui';
import styles from './citiesBlock.module.scss';
import {
  fetchPointsToCities,
  fetchPointsToCity,
} from '../../../store/actionCreators/points';
import { Loader } from '../../other';
import FormLoader from '../layout/formLoader';
import InfoError from '../layout/infoError';
import { IPoint } from '../../../types/actions/points';
import { ICity } from '../../../types/actions/cities';

export const CitiesBlock: React.FC = () => {
  const dispatch = useDispatch();
  const [stateCity, setStateCity] = useState<string>('');
  const { cities } = useTypeSelector((state) => state.cities);
  const { points, loading } = useTypeSelector((state) => state.points);
  const [citiesSelect, setCitiesSelect] = useState<ICity[]>([]);
  const [firstStep, setFirstStep] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchCities());
  }, []);

  useEffect(() => {
    if (!firstStep && cities.length) {
      changeCity();
      setFirstStep(true);
    }
  }, [cities]);

  const changeCities = (id: string) => {
    let citiesIds: ICity[];
    if (id) {
      citiesIds = cities.filter((city) => city.id == id);
    } else {
      citiesIds = cities;
    }
    setCitiesSelect(citiesIds);
  };

  const onChangeCityId = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setStateCity(value);
  };

  const changeCity = () => {
    if (stateCity) {
      dispatch(fetchPointsToCity(stateCity));
    } else {
      dispatch(fetchPointsToCities([]));
    }
    changeCities(stateCity);
  };

  const convertArrayToString = (pointsArr: IPoint[]) => {
    const pointNames: string[] = [];
    pointsArr.map((point) => pointNames.push(point.address));
    return pointNames.join(', ');
  };

  const refreshCities = () => {
    dispatch(fetchPointsToCities([]));
    changeCities('');
    setStateCity('');
  };

  return (
    <Layout nameLayout={'Список городов'}>
      <Upper>
        <Select
          data={cities}
          onChange={onChangeCityId}
          allPoints={'Все города'}
        />
        <Button size={'s'} color={'red'} onClick={refreshCities}>
          Сбросить
        </Button>
        <Button size={'s'} color={'blue'} onClick={changeCity}>
          Применить
        </Button>
      </Upper>
      {cities.length !== 0 && points.length != 0 && (
        <div className={styles.citiesBlock}>
          <div className={styles.titleBlock}>
            <span>Город</span>
            <span>Адреса</span>
          </div>

          {citiesSelect.map((city) => (
            <div className={styles.cityCard} key={city.id}>
              <span>{city.name}</span>
              <span>
                {convertArrayToString(
                  points.filter((point) => point.cityId.id === city.id)
                )}
              </span>
            </div>
          ))}
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
