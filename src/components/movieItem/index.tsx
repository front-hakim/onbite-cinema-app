import { MovieData } from '@/app/types';
import Link from 'next/link';
import React from 'react';

const MovieItem = (props: MovieData) => {
  const { id, posterImgUrl } = props;

  return (
    <Link href={`/movie/${id}`}>
      <img src={posterImgUrl} alt="title" />
    </Link>
  );
};

export default MovieItem;
