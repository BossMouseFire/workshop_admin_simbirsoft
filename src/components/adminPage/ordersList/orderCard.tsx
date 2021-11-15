import React from 'react';
import styles from './ordersList.module.scss';
import { convertDate, convertUrlImg } from '../../../utils/utils';
import { ButtonsBlock, CheckBox } from '../../ui';
import { IOrder } from '../../../types/actions/orders';

interface IOrderCard {
  order: IOrder;
}

const OrderCard: React.FC<IOrderCard> = ({ order }) => {
  return (
    <div className={styles.orderCard}>
      <div className={styles.imgBlock}>
        <img
          src={convertUrlImg(order.carId?.thumbnail.path)}
          alt={'автомобиль'}
        />
      </div>
      <div className={styles.orderInfo}>
        <p>
          <span>{order.carId?.name}</span> в <span>{order.cityId?.name}</span>,{' '}
          {order.pointId?.address}
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
          <CheckBox defaultChecked={order.isFullTank} />
          <span>Полный бак</span>
        </div>
        <div className={styles.checkBlock}>
          <CheckBox defaultChecked={order.isNeedChildChair} />
          <span>Детсткое кресло</span>
        </div>
        <div className={styles.checkBlock}>
          <CheckBox defaultChecked={order.isRightWheel} />
          <span>Правый руль</span>
        </div>
      </div>
      <div className={styles.totalPrice}>{order.price}₽</div>
      <ButtonsBlock />
    </div>
  );
};

export default OrderCard;
