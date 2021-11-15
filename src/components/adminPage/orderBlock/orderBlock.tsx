import React, { useEffect } from 'react';
import styles from './orderBlock.module.scss';
import { Button, CheckBox, Select } from '../../ui';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { useDispatch } from 'react-redux';
import { fetchCities } from '../../../store/actionCreators/cities';
import { fetchStatuses } from '../../../store/actionCreators/orderStatuses';
import { fetchOrders } from '../../../store/actionCreators/orders';
import { ButtonsBlock } from '../../ui/buttonsBlock/buttonsBlock';
export const OrderBlock: React.FC = () => {
  const dispatch = useDispatch();
  const { cities } = useTypeSelector((state) => state.cities);
  const { statuses } = useTypeSelector((state) => state.orderStatuses);
  const { orders } = useTypeSelector((state) => state.orders);
  useEffect(() => {
    dispatch(fetchOrders(1, 1));
    dispatch(fetchCities());
    dispatch(fetchStatuses());
  }, []);

  const convertDate = (dateInMs: number): string => {
    const date = new Date(dateInMs);
    const day = date.getDay() > 9 ? date.getDay() : `0${date.getDay()}`;
    const month = date.getMonth() > 9 ? date.getMonth() : `0${date.getMonth()}`;
    const hours = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
    const minutes =
      date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
    return `${day}.${month}.${date.getFullYear()} ${hours}:${minutes}`;
  };
  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>Заказы</span>
      <div className={styles.ordersBlock}>
        <div className={styles.upper}>
          <Select data={cities} />
          <Select data={statuses} />
          <Button color={'blue'}>Применить</Button>
        </div>
        {orders.map((order) => (
          <div className={styles.orderCard} key={order.id}>
            <div className={styles.imgBlock}>
              <img
                src={`https://api-factory.simbirsoft1.com/${order.carId.thumbnail.path}`}
                alt={'автомобиль'}
              />
            </div>
            <div className={styles.orderInfo}>
              <p>
                <span>{order.carId.name}</span> в{' '}
                <span>{order.cityId.name}</span>, {order.pointId.address}
              </p>
              <p>
                {convertDate(order.dateFrom)} - {convertDate(order.dateTo)}
              </p>
              <p>
                Цвет: <span>{order.color}</span>
              </p>
            </div>
            <div className={styles.addInfo}>
              <div className={styles.checkBlock}>
                <CheckBox checked={order.isFullTank} />
                <span>Полный бак</span>
              </div>
              <div className={styles.checkBlock}>
                <CheckBox checked={order.isNeedChildChair} />
                <span>Детсткое кресло</span>
              </div>
              <div className={styles.checkBlock}>
                <CheckBox checked={order.isRightWheel} />
                <span>Правый руль</span>
              </div>
            </div>
            <div className={styles.totalPrice}>{order.price}₽</div>
            <ButtonsBlock />
          </div>
        ))}
        <div className={styles.lower} />
      </div>
    </div>
  );
};
