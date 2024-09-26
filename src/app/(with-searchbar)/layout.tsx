import React, { ReactNode } from 'react';
import Searchbar from './search/searchbar';
import style from '@/app/styles/search-layout.module.css';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={style.container}>
      <Searchbar />
      {children}
    </div>
  );
};

export default Layout;
