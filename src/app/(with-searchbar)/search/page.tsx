import MovieItem from '@/components/movieItem';
import { MovieData } from '@/app/types';
import Head from 'next/head';
import React, { Suspense } from 'react';
import style from '@/app/styles/search-result.module.css';
import MovieSkeletonList from '@/components/movie-skeleton-list';
import delay from '@/utils/delay';

const SearchResultList = async ({ q }: { q: string }) => {
  await delay(2000);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/movie/search?q=${q}`
  );
  const searchMovies = await res.json();

  if (!res.ok) return <div>오류가 발생했습니다...</div>;

  return (
    <div className={style.container}>
      {searchMovies.map((item: MovieData) => (
        <MovieItem key={item.id} {...item} />
      ))}
    </div>
  );
};

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
      <Suspense
        key={searchParams.q || ''}
        fallback={<MovieSkeletonList count={3} />}
      >
        <SearchResultList q={searchParams.q || ''} />
      </Suspense>
    </>
  );
};

export default Page;
