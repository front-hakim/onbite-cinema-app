'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

const Searchbar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';

  const [value, setValue] = useState(q);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    router.push(`/search?q=${value}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleClick();
  };

  return (
    <div>
      <input
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={value}
      />
      <button onClick={handleClick}>검색</button>
    </div>
  );
};

export default Searchbar;
