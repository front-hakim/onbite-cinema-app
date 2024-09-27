import MovieItem from '@/app/components/movieItem';
import { MovieData } from '@/app/types';
import Head from 'next/head';
import React from 'react';
import style from '@/app/styles/search-result.module.css';

const Page = async ({ searchParams }: { searchParams: { q?: string } }) => {
  const q = searchParams.q;

  // 검색 결과값에 따라 늘 새로운 데이터를 패칭하고 보여줘야 하기 때문에 기본 옵션 사용
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/movie/search?q=${q}`
  );
  const searchMovies = await res.json();

  if (!res.ok) return <div>오류가 발생했습니다...</div>;

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
