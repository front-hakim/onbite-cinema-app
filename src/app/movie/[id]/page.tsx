import Head from 'next/head';
import React from 'react';
import detail from '@/app/mocks/detail.json';
import style from '@/app/styles/detail.module.css';

const Page = ({ params }: { params: { id: string } }) => {
  // const id = params.id;

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
