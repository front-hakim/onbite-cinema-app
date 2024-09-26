import MovieItem from '@/app/components/movieItem';
import { MovieData } from '@/app/types';
import Head from 'next/head';
import React from 'react';
import searchMovies from '@/app/mocks/recommend.json';
import style from '@/app/styles/search-result.module.css';

const Page = ({ searchParams }: { searchParams: { q?: string } }) => {
  const q = searchParams.q;

  return (
    <>
      <Head>
        <title>한입 영화 - {q}</title>
        <meta property="og:title" content={q} />
        <meta property="og:description" content="한입 영화 메인페이지입니다." />
        <meta property="og:image" content="/thumbnail.png" />
      </Head>
      <div className={style.container}>
        {searchMovies.map((item: MovieData) => (
          <MovieItem key={item.id} {...item} />
        ))}
      </div>
    </>
  );
};

export default Page;
