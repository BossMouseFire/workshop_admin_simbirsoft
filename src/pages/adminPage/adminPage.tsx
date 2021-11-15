import React from 'react';
import { Menu, Footer, Navbar, OrderBlock } from '../../components/adminPage/';
import styles from './adminPage.module.scss';
const AdminPage = () => {
  return (
    <div className={styles.adminPage}>
      <Menu />
      <div className={styles.mainPart}>
        <Navbar />
        <OrderBlock />
        <Footer />
      </div>
    </div>
  );
};

export default AdminPage;
