import React from 'react';
import style from '@/app/styles/movie-skeleteon.module.css';

const MovieSkeletonItem = ({ type = 'all' }: { type: string }) => {
  return <div className={style[type]} />;
};

export default MovieSkeletonItem;
