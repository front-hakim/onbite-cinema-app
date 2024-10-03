'use client';

import Link from 'next/link';
import React, { ReactNode } from 'react';
import style from '@/app/styles/client-layout.module.css';

const ClientLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={style.container}>
      <Link href="/">ONEBITE CINEMA</Link>
      {children}
    </div>
  );
};

export default ClientLayout;
