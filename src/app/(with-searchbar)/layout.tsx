import React, { ReactNode, Suspense } from 'react';
import Searchbar from './search/searchbar';
import style from '@/app/styles/search-layout.module.css';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={style.container}>
      <Suspense fallback={<div>Loading...</div>}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
};

export default Layout;
