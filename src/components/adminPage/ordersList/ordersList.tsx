import React from 'react';
import { IOrder } from '../../../types/actions/orders';
import styles from './ordersList.module.scss';
import OrderCard from './orderCard';

interface IOrdersList {
  orders: IOrder[];
}

export const OrdersList: React.FC<IOrdersList> = ({ orders }) => {
  return (
    <div className={styles.ordersList}>
      {orders.map((order) => (
        <OrderCard order={order} key={order.id} />
      ))}
    </div>
  );
};
