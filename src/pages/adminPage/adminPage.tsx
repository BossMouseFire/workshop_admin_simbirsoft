import React from 'react';
import { Menu, Footer, Navbar } from '../../components/adminPage/';
import styles from './adminPage.module.scss';
const AdminPage = () => {
  return (
    <div className={styles.adminPage}>
      <Menu />
      <div className={styles.mainPart}>
        <Navbar />
        <Footer />
      </div>
    </div>
  );
};

export default AdminPage;
