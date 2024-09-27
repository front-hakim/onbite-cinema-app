import Head from 'next/head';
import React from 'react';
import style from '@/app/styles/detail.module.css';

const Page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  // id값에 따라 늘 새로운 데이터를 보여줘야 하기 때문에 기본 옵션 사용
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie/${id}`);
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

  if (!res.ok) return <div>오류가 발생했습니다...</div>;

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
