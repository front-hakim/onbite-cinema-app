import allMovies from '@/app/mocks/all.json';
import recoMovies from '@/app/mocks/recommend.json';
import Head from 'next/head';
import style from '@/app/styles/home.module.css';
import { MovieData } from '../types';
import MovieItem from '../components/movieItem';

export default function Home() {
  console.log(allMovies, recoMovies);

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
        <div className={style.recommend}>
          {recoMovies.map((item: MovieData) => (
            <MovieItem key={`reco-${item.id}`} {...item} />
          ))}
        </div>
      </section>
      <section>
        <h2>등록된 모든 영화</h2>
        <div className={style.all}>
          {allMovies.map((item: MovieData) => (
            <MovieItem key={`all-${item.id}`} {...item} />
          ))}
        </div>
      </section>
    </>
  );
}
