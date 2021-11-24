import React, { useEffect, useState } from 'react';
import styles from './pagination.module.scss';

interface IPagination {
  changeEntities: (newPage: number) => void;
  maxCount: number;
  limit: number;
  entities: any[];
  isRefresh?: boolean;
}

const Pagination: React.FC<IPagination> = ({
  changeEntities,
  maxCount,
  limit,
  entities,
  isRefresh,
}) => {
  const [page, setPage] = useState<number>(0);
  const [arrayPages, setArrayPages] = useState<number[]>([]);

  useEffect(() => {
    if (entities.length) {
      editPage(page);
    }
  }, [entities]);

  useEffect(() => {
    changeOrders(0);
    setPage(0);
  }, [isRefresh]);

  const changeOrders = (page: number) => {
    changeEntities(page);
    setPage(page);
  };

  const prevPage = (): void => {
    if (page > 0) {
      changeOrders(page - 1);
    }
  };

  const nextPage = (): void => {
    if (page < Math.ceil(maxCount / limit) - 1) {
      changeOrders(page + 1);
    }
  };

  const editPage = (page: number): void => {
    const currentElem = page * limit;
    const array: number[] = [];
    const minNum = Math.min((maxCount - currentElem) / limit, 5);
    for (let i = page; i < page + minNum; i++) {
      array.push(i);
    }
    setArrayPages(array);
  };

  return (
    <div className={styles.pagination}>
      <div onClick={prevPage}>«</div>
      {arrayPages.map((pageNum, index) => (
        <div key={index} onClick={() => changeOrders(pageNum)}>
          {pageNum + 1}
        </div>
      ))}
      <div onClick={nextPage}>»</div>
    </div>
  );
};

export default Pagination;
