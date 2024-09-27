import Head from 'next/head';
import React from 'react';
import style from '@/app/styles/detail.module.css';
import { notFound } from 'next/navigation';

export const generateStaticParams = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie`, {
    cache: 'force-cache',
  });
  const allMovies = await res.json();
  const ids = allMovies.map(({ id }: { id: number }) => ({ id: String(id) }));

  return ids;
};

const Page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  // id값에 따라 새로운 데이터를 호출하고 해당 데이터를 캐싱하기 위한 옵션 적용
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie/${id}`, {
    cache: 'force-cache',
  });
  const detail = await res.json();

  const {
    company,
    description,
    genres,
    posterImgUrl,
    releaseDate,
    runtime,
    subTitle,
    title,
  } = detail;

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다...</div>;
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={posterImgUrl} />
      </Head>
      <div className={style.container}>
        <div
          className={style.background}
          style={{
            background: `url(${posterImgUrl}) center no-repeat`,
            backgroundSize: 'cover',
          }}
        >
          <img src={posterImgUrl} alt={title} />
        </div>
        <h3>{title}</h3>
        <p>
          {releaseDate} / {genres.join(', ')} / {runtime}분
        </p>
        <p>{company}</p>
        <h4>{subTitle}</h4>
        <p>{description}</p>
      </div>
    </>
  );
};

export default Page;
