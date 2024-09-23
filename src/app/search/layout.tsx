import React, { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      Searchbar Layout
      {children}
    </div>
  );
};

export default Layout;
