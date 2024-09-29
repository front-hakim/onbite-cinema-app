import React from 'react';
import style from '@/app/styles/loading.module.css';

const Loading = () => {
  return (
    <div className={style.container}>
      <div className={style.spinner} />
    </div>
  );
};

export default Loading;
