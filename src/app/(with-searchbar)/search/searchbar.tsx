'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import style from '@/app/styles/searchbar.module.css';

const Searchbar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
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

  useEffect(() => {
    q ? setValue(q) : setValue('');
  }, [pathname]);

  return (
    <div className={style.wrapper}>
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
