import React, { ChangeEvent, useEffect, useState } from 'react';
import { Layout } from '../layout/layout';
import styles from './cityBlock.module.scss';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { useDispatch } from 'react-redux';
import { addCity, fetchCities } from '../../../store/actionCreators/cities';
import { EditCard } from './editCard';
import { Button, Input, Select } from '../../ui';
import {
  addPoint,
  fetchPointsToCity,
} from '../../../store/actionCreators/points';
import { deleteCity, deletePoint, postCity, postPoint } from '../../../api/api';

export const CityBlock: React.FC = () => {
  const { cities } = useTypeSelector((state) => state.cities);
  const { points, loading: pointsLoading } = useTypeSelector(
    (state) => state.points
  );
  const [delCities, setDelCities] = useState<string[]>([]);
  const [delPoints, setDelPoints] = useState<string[]>([]);
  const [namePoint, setNamePoint] = useState<string>('');
  const [addressPoint, setAddressPoint] = useState<string>('');
  const [cityName, setCityName] = useState<string>('');
  const [selectCity, setSelectCity] = useState<string>('');

  const [isErrorNameCity, setErrorNameCity] = useState<boolean>(false);
  const [isErrorNamePoint, setErrorNamePoint] = useState<boolean>(false);
  const [isErrorAddressPoint, setErrorAddressPoint] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCities());
  }, []);

  useEffect(() => {
    if (cities.length) {
      dispatch(fetchPointsToCity(cities[0].id));
      setSelectCity(cities[0].id);
    }
    setDelPoints([]);
  }, [cities]);

  const changePoints = (e: ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectCity(id);
    dispatch(fetchPointsToCity(id));
  };

  const onAddCity = () => {
    if (!cityName) {
      setErrorNameCity(true);
    }

    if (cityName) {
      postCity(cityName).then((response) => {
        const city = response.data.data;
        dispatch(addCity(city));
      });
    }
  };

  const onDeleteCities = () => {
    if (delCities.length) {
      const promises: any = [];
      delCities.map((id) => {
        promises.push(deleteCity(id));
      });
      Promise.all(promises).then(() => {
        dispatch(fetchCities());
        setDelCities([]);
      });
    }
  };

  const onDeletePoints = () => {
    if (delPoints.length) {
      console.log(delPoints);
      const promises: any = [];
      delPoints.map((id) => {
        promises.push(deletePoint(id));
      });
      console.log(promises);
      Promise.all(promises).then(() => {
        dispatch(fetchPointsToCity(selectCity));
        setDelPoints([]);
      });
    }
  };

  const onAddPoint = () => {
    if (!namePoint) {
      setErrorNamePoint(true);
    }

    if (!addressPoint) {
      setErrorAddressPoint(true);
    }

    if (namePoint && addressPoint) {
      postPoint(namePoint, addressPoint, selectCity).then((response) => {
        dispatch(addPoint(response.data.data));
      });
    }
  };

  const changeNameCity = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    if (name) {
      setErrorNameCity(false);
    }
    setCityName(name);
  };

  const changeNamePoint = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    if (name) {
      setErrorNamePoint(false);
    }
    setNamePoint(name);
  };

  const changeAddressPoint = (e: ChangeEvent<HTMLInputElement>) => {
    const address = e.target.value;
    if (address) {
      setErrorAddressPoint(false);
    }
    setAddressPoint(address);
  };
  return (
    <Layout nameLayout={'Редактирование городов'}>
      <div className={styles.cityBlock}>
        <div className={styles.firstOptions}>
          <span className={styles.title}>Города</span>
          <div className={styles.editBlock}>
            {cities.map((city) => (
              <EditCard
                entry={city}
                key={city.id}
                delArray={delCities}
                setDelArray={setDelCities}
              />
            ))}
          </div>
          <div>
            <Button size={'s'} color={'red'} onClick={onDeleteCities}>
              Удалить
            </Button>
          </div>
          <div className={styles.addBlock}>
            <Input
              isError={isErrorNameCity}
              placeholder={'Добавить город'}
              value={cityName}
              onChange={changeNameCity}
            />
            <Button size={'s'} color={'green'} onClick={onAddCity}>
              Добавить
            </Button>
          </div>
        </div>
        <div className={styles.secondOptions}>
          <span className={styles.title}>Адреса</span>
          <Select
            className={styles.selectCity}
            data={cities}
            sizeSelect={'10'}
            onChange={changePoints}
          />
          <div className={styles.editBlock}>
            {points &&
              points.map((point) => (
                <EditCard
                  entry={point}
                  key={point.id}
                  delArray={delPoints}
                  setDelArray={setDelPoints}
                />
              ))}
            {!points.length && !pointsLoading && (
              <span className={styles.infoAbsent}>Информация отсутствует</span>
            )}
          </div>
          <div>
            <Button size={'s'} color={'red'} onClick={onDeletePoints}>
              Удалить
            </Button>
          </div>
          <div className={styles.addBlock}>
            <Input
              isError={isErrorNamePoint}
              placeholder={'Добавить название'}
              value={namePoint}
              onChange={changeNamePoint}
            />
            <Input
              isError={isErrorAddressPoint}
              placeholder={'Добавить адрес'}
              value={addressPoint}
              onChange={changeAddressPoint}
            />
            <Button size={'s'} color={'green'} onClick={onAddPoint}>
              Добавить
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
