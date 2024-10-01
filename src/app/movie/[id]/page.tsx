import Head from 'next/head';
import React from 'react';
import style from '@/app/styles/detail.module.css';
import { notFound } from 'next/navigation';
import { ReviewData } from '@/app/types';
import formatDate from '@/utils/formatDate';
import createReviewActions from '@/actions/createReviewActions';

export const generateStaticParams = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie`, {
    cache: 'force-cache',
  });
  const allMovies = await res.json();
  const ids = allMovies.map(({ id }: { id: number }) => ({ id: String(id) }));

  return ids;
};

const MovieDetail = async ({ movieId }: { movieId: string }) => {
  // id값에 따라 새로운 데이터를 호출하고 해당 데이터를 캐싱하기 위한 옵션 적용
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/movie/${movieId}`,
    {
      cache: 'force-cache',
    }
  );
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

const RegisterReview = ({ movieId }: { movieId: string }) => {
  return (
    <section>
      <form action={createReviewActions} className={style.review_form}>
        <input type="text" name="movieId" value={movieId} hidden />
        <textarea required className={style.textarea} name="content" />
        <div className={style.input_wrapper}>
          <input required className={style.input} type="text" name="author" />
          <button type="submit">작성하기</button>
        </div>
      </form>
    </section>
  );
};

const ReviewList = async ({ movieId }: { movieId: string }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/review/movie/${movieId}`
  );

  const list: ReviewData[] = await res.json();

  if (!res.ok) {
    throw new Error(`Review fetch failed : ${res.statusText}`);
  }

  if (list.length === 0) return;

  return (
    <section className={style.review_list_container}>
      {list.map(({ id, createdAt, content, author }: ReviewData) => (
        <div key={id}>
          <div className={style.author}>
            <span>{author}</span>
            <span>{formatDate(createdAt)}일 작성됨</span>
          </div>
          <p>{content}</p>
          <div>
            <button className={style.remove}>리뷰 삭제하기</button>
          </div>
        </div>
      ))}
    </section>
  );
};

const Page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  return (
    <>
      <MovieDetail movieId={id} />
      <RegisterReview movieId={id} />
      <ReviewList movieId={id} />
    </>
  );
};

export default Page;
