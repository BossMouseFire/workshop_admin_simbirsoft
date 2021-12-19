import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Select } from '../../ui';
import { useDispatch } from 'react-redux';
import { fetchCities } from '../../../store/actionCreators/cities';
import { fetchStatuses } from '../../../store/actionCreators/orderStatuses';
import { fetchOrdersByParams } from '../../../store/actionCreators/orders';
import { OrdersList } from './ordersList/ordersList';
import { Loader } from '../../other';
import Pagination from '../pagination/pagination';
import { LayoutTable } from '../layout/layout';
import Upper from '../layout/upper';
import Lower from '../layout/lower';
import FormLoader from '../layout/formLoader';
import InfoError from '../layout/infoError';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
export const OrderBlock: React.FC = () => {
  const dispatch = useDispatch();
  const { cities } = useTypeSelector((state) => state.cities);
  const { statuses } = useTypeSelector((state) => state.orderStatuses);
  const { orders, maxCount, loading } = useTypeSelector(
    (state) => state.orders
  );
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

  const cancelChange = () => {
    setStateCity(undefined);
    setStateStatus(undefined);
    refreshOrders();
  };

  const changeOrders = (newPage: number) => {
    dispatch(fetchOrdersByParams(newPage, limit, stateCity, stateStatus));
  };
  return (
    <LayoutTable nameLayout={'Заказы'}>
      <Upper>
        <Select
          data={cities}
          onChange={onChangeCity}
          allPoints={'Все города'}
          sizeSelect={'10'}
        />
        <Select
          data={statuses}
          onChange={onChangeStatus}
          allPoints={'Все статусы'}
          sizeSelect={'10'}
        />
        <Button size={'s'} color={'red'} onClick={cancelChange}>
          Сбросить
        </Button>
        <Button size={'s'} color={'blue'} onClick={refreshOrders}>
          Применить
        </Button>
      </Upper>
      {orders.length !== 0 && <OrdersList orders={orders} />}
      {loading && (
        <FormLoader>
          <Loader size={10} />
        </FormLoader>
      )}
      {!loading && !orders.length && <InfoError />}
      <Lower>
        <Pagination
          entities={orders}
          changeEntities={changeOrders}
          limit={limit}
          maxCount={maxCount}
          isRefresh={isRefresh}
        />
      </Lower>
    </LayoutTable>
  );
};
