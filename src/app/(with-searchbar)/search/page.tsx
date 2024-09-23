import React from 'react';

const Page = ({ searchParams }: { searchParams: { q?: string } }) => {
  const q = searchParams.q;

  return <div>{q}</div>;
};

export default Page;
