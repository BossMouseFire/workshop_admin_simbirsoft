import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './orderBlock.module.scss';
import { Button, Select } from '../../ui';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { useDispatch } from 'react-redux';
import { fetchCities } from '../../../store/actionCreators/cities';
import { fetchStatuses } from '../../../store/actionCreators/orderStatuses';
import { fetchOrdersByParams } from '../../../store/actionCreators/orders';
import { OrdersList } from '../';
export const OrderBlock: React.FC = () => {
  const dispatch = useDispatch();
  const { cities } = useTypeSelector((state) => state.cities);
  const { statuses } = useTypeSelector((state) => state.orderStatuses);
  const { orders, maxCount } = useTypeSelector((state) => state.orders);
  const [arrayPages, setArrayPages] = useState<number[]>([]);
  const [page, setPage] = useState<number>(0);
  const [stateCity, setStateCity] = useState<string | undefined>(undefined);
  const [stateStatus, setStateStatus] = useState<string | undefined>(undefined);
  const limit = 3;
  useEffect(() => {
    dispatch(fetchOrdersByParams(page, limit));
    dispatch(fetchCities());
    dispatch(fetchStatuses());
  }, []);

  useEffect(() => {
    if (orders.length) {
      editPage(page);
    }
  }, [orders]);

  const changeOrders = (page: number) => {
    dispatch(fetchOrdersByParams(page, limit, stateCity, stateStatus));
    setPage(page);
  };

  const editPage = (page: number): void => {
    const currentElem = page * limit;
    const array: number[] = [];
    const minNum = Math.min((maxCount - currentElem) / limit, 5);
    console.log(maxCount);
    for (let i = page; i < page + minNum; i++) {
      array.push(i);
    }
    setArrayPages(array);
  };

  const prevPage = (): void => {
    if (page > 0) {
      changeOrders(page - 1);
    }
  };

  const nextPage = (): void => {
    if (page < Math.ceil(maxCount / limit) - 1) {
      console.log(page, Math.ceil(maxCount / limit));
      changeOrders(page + 1);
    }
  };

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

  const changeOrdersByParams = () => {
    changeOrders(0);
    setPage(0);
  };
  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>Заказы</span>
      <div className={styles.ordersBlock}>
        <div className={styles.upper}>
          <Select data={cities} onChange={onChangeCity} />
          <Select data={statuses} onChange={onChangeStatus} />
          <Button color={'blue'} onClick={changeOrdersByParams}>
            Применить
          </Button>
        </div>
        <OrdersList orders={orders} />
        <div className={styles.lower}>
          <div className={styles.pagination}>
            <div onClick={prevPage}>«</div>
            {arrayPages.map((pageNum, index) => (
              <div key={index} onClick={() => changeOrders(pageNum)}>
                {pageNum + 1}
              </div>
            ))}
            <div onClick={nextPage}>»</div>
          </div>
        </div>
      </div>
    </div>
  );
};
