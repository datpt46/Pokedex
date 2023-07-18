'use client';

import Image from 'next/image';
import { useState } from 'react';

const ViewImage = ({ srcs }: { srcs: string[] }) => {
  const [imgSrc, setImgSrc] = useState<string>(srcs?.[0]);

  const changeImageSource = () => {
    if (srcs.length < 1) return;
    const sources = [...srcs].filter((src) => src !== imgSrc);
    if (sources.length < 1) return;
    setImgSrc(sources[0]);
  };

  return (
    <Image
      className="w-full cursor-pointer"
      src={imgSrc}
      alt="pokemon avatar"
      width={384}
      height={384}
      loading="lazy"
      placeholder="blur"
      blurDataURL="/default-sm.png"
      onClick={changeImageSource}
      style={{ maxHeight: '384px', width: '384px' }}
    />
  );
};

export default ViewImage;
