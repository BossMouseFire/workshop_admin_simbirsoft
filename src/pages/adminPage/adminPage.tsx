import React, { useState } from 'react';
import {
  Menu,
  Footer,
  Navbar,
  OrderBlock,
  ErrorBlock,
  CarsBlock,
  CitiesBlock,
  CarBlock,
} from '../../components/adminPage/';
import styles from './adminPage.module.scss';
const AdminPage = () => {
  const [section, setSection] = useState(2);

  const changeSection = () => {
    switch (section) {
      case 0:
        return <CarBlock />;
      case 1:
        return <CarsBlock />;
      case 2:
        return <OrderBlock />;
      case 3:
        return <CitiesBlock />;
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
