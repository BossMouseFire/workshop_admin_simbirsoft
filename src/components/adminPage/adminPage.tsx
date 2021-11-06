import React from 'react';
import Menu from './menu/menu';
import Footer from './footer/footer';
import styles from './adminPage.module.scss';
import Navbar from './navbar/navbar';
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
