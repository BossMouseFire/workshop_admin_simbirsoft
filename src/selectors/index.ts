import { useTypeSelector } from '../hooks/useTypeSelector';

export const useSelectCities = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { cities, loading, error } = useTypeSelector((state) => state.cities);
  return { cities, loading, error };
};

export const useSelectStatuses = () => {
  const { statuses, loading, error } = useTypeSelector(
    (state) => state.orderStatuses
  );
  return { statuses, loading, error };
};

export const useSelectOrders = () => {
  const { orders, maxCount, loading, error } = useTypeSelector(
    (state) => state.orders
  );
  return { orders, maxCount, loading, error };
};
