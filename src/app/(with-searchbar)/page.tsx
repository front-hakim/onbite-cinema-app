import Head from 'next/head';
import style from '@/app/styles/home.module.css';
import { MovieData } from '../types';
import MovieItem from '../../components/movieItem';
import { Suspense } from 'react';
import MovieSkeletonList from '../../components/movie-skeleton-list';
import delay from '@/utils/delay';

export const dynamic = 'force-dynamic';

// 영화 전체 목록은 한번만 보여주면 크게 변할 일이 없기 때문에 force-cache 활성화
const AllMovies = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie`, {
    cache: 'force-cache',
  });
  const allMovies = await res.json();

  if (!res.ok) return <div>오류가 발생했습니다...</div>;

  return (
    <div className={style.all}>
      {allMovies.map((item: MovieData) => (
        <MovieItem key={`all-${item.id}`} {...item} />
      ))}
    </div>
  );
};

// 추천 영화는 사용자에게 매번 다른 목록을 보여주는 것이 더 직관적으로 느껴질 듯하여 기본 옵션 사용
const RecoMovies = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie/random`);
  const recoMovies = await res.json();

  if (!res.ok) return <div>오류가 발생했습니다...</div>;

  return (
    <div className={style.recommend}>
      {recoMovies.map((item: MovieData) => (
        <MovieItem key={`reco-${item.id}`} {...item} />
      ))}
    </div>
  );
};

export default function Home() {
  return (
    <>
      <Head>
        <title>한입 영화</title>
        <meta property="og:title" content="한입 영화" />
        <meta property="og:description" content="한입 영화 메인페이지입니다." />
        <meta property="og:image" content="/thumbnail.png" />
      </Head>
      <section>
        <h2>지금 가장 추천하는 영화</h2>
        <Suspense fallback={<MovieSkeletonList count={3} />}>
          <RecoMovies />
        </Suspense>
      </section>
      <section>
        <h2>등록된 모든 영화</h2>
        <Suspense fallback={<MovieSkeletonList count={10} />}>
          <AllMovies />
        </Suspense>
      </section>
    </>
  );
}
