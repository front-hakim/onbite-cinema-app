import React from 'react';
import MovieSkeletonItem from '../movie-skeleton-item';
import style from '@/app/styles/movie-skeleton-list.module.css';

const MovieSkeletonList = ({ count }: { count: number }) => {
  const type = count === 3 ? 'recommend' : 'all';

  return (
    <div className={style[type]}>
      {new Array(count).fill(0).map((_, idx) => (
        <MovieSkeletonItem type={type} key={`movie-skeleton-item-${idx}`} />
      ))}
    </div>
  );
};

export default MovieSkeletonList;
