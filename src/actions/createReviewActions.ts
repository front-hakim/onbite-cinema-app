'use server';

const createReviewActions = async (formData: FormData) => {
  const content = formData.get('content') as string;
  const author = formData.get('author') as string;
  const movieId = formData.get('movieId') as string;

  if (!content || !author || !movieId) return;

  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/review`, {
      method: 'POST',
      body: JSON.stringify({ content, author, movieId }),
    });
  } catch (error) {
    console.error(error);
    return;
  }
};

export default createReviewActions;
