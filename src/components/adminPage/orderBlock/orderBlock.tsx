import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './orderBlock.module.scss';
import { Button, Select } from '../../ui';
import { useDispatch } from 'react-redux';
import { fetchCities } from '../../../store/actionCreators/cities';
import { fetchStatuses } from '../../../store/actionCreators/orderStatuses';
import { fetchOrdersByParams } from '../../../store/actionCreators/orders';
import { OrdersList } from './ordersList/ordersList';
import { Loader } from '../../other';
import {
  useSelectCities,
  useSelectStatuses,
  useSelectOrders,
} from '../../../selectors/';
import Pagination from '../pagination/pagination';
import Layout from '../layout/layout';
import Upper from '../layout/upper';
import Lower from '../layout/lower';
export const OrderBlock: React.FC = () => {
  const dispatch = useDispatch();
  const { cities } = useSelectCities();
  const { statuses } = useSelectStatuses();
  const { orders, maxCount, loading } = useSelectOrders();
  const [stateCity, setStateCity] = useState<string | undefined>(undefined);
  const [stateStatus, setStateStatus] = useState<string | undefined>(undefined);
  const [isRefresh, setIsRefresh] = useState<boolean>(true);
  const limit = 3;
  useEffect(() => {
    dispatch(fetchOrdersByParams(0, limit));
    dispatch(fetchCities());
    dispatch(fetchStatuses());
  }, []);

  const onChangeCity = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!value) {
      setStateCity(undefined);
    } else {
      setStateCity(value);
    }
  };

  const onChangeStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!value) {
      setStateStatus(undefined);
    } else {
      setStateStatus(value);
    }
  };

  const refreshOrders = () => {
    setIsRefresh((state) => !state);
  };

  const changeOrders = (newPage: number) => {
    dispatch(fetchOrdersByParams(newPage, limit, stateCity, stateStatus));
  };

  return (
    <Layout nameLayout={'Заказы'}>
      <Upper>
        <Select data={cities} onChange={onChangeCity} />
        <Select data={statuses} onChange={onChangeStatus} />
        <Button size={'s'} color={'blue'} onClick={refreshOrders}>
          Применить
        </Button>
      </Upper>
      {orders.length !== 0 && <OrdersList orders={orders} />}
      {loading && (
        <div className={styles.formLoader}>
          <Loader size={10} />
        </div>
      )}
      {!loading && !orders.length && (
        <div className={styles.infoAbsent}>Информация отсутствует</div>
      )}
      <Lower>
        <Pagination
          entities={orders}
          changeEntities={changeOrders}
          limit={limit}
          maxCount={maxCount}
          isRefresh={isRefresh}
        />
      </Lower>
    </Layout>
  );
};
