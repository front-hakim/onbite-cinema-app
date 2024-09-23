import React, { ReactNode } from 'react';
import Searchbar from './search/searchbar';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Searchbar />
      {children}
    </div>
  );
};

export default Layout;
