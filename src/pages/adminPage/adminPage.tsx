import React, { useEffect, useState } from 'react';
import {
  Menu,
  Footer,
  Navbar,
  OrderBlock,
  ErrorBlock,
  CarsBlock,
  CitiesBlock,
  CarBlock,
  CityBlock,
} from '../../components/adminPage/';
import styles from './adminPage.module.scss';
import { ICar } from '../../types/actions/cars';
const AdminPage = () => {
  const [section, setSection] = useState(0);
  const [car, setCar] = useState<ICar | undefined>();

  useEffect(() => {
    if (section !== 0) {
      setCar(undefined);
    }
  }, [section]);

  const changeCar = (car: ICar) => {
    setCar(car);
    setSection(0);
  };

  const changeSection = () => {
    switch (section) {
      case 0:
        return <CarBlock car={car} />;
      case 1:
        return <CarsBlock changeCar={changeCar} />;
      case 2:
        return <OrderBlock />;
      case 3:
        return <CitiesBlock />;
      case 4:
        return <CityBlock />;
      default:
        return <ErrorBlock />;
    }
  };
  return (
    <div className={styles.adminPage}>
      <Menu setSection={setSection} activeSection={section} />
      <div className={styles.mainPart}>
        <Navbar />
        {changeSection()}
        <Footer />
      </div>
    </div>
  );
};

export default AdminPage;
