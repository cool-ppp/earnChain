import { Skeleton } from 'antd';
import clsx from 'clsx';
import React, { useCallback } from 'react';
import { useState } from 'react';
import styles from './index.module.css';

const imageType = {
  cover: 'object-cover',
  contain: 'object-contain',
};

interface ISkeletonImage {
  img?: string;
  className?: string;
  alt?: string;
  imageSizeType?: 'cover' | 'contain';
  width?: number;
  height?: number;
}

function SkeletonImage(props: ISkeletonImage) {
  const { img: imageUrl, className, alt, width = 108, height = 108 } = props;

  const [skeletonActive, setSkeletonActive] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  const onLoad = useCallback(() => {
    setLoading(false);
    setSkeletonActive(false);
  }, []);

  const onError = useCallback(() => {
    setSkeletonActive(false);
  }, []);

  return (
    <div
      className={clsx('relative rounded-lg overflow-hidden', styles['skeleton-image'], className)}
    >
      {(loading || !imageUrl) && (
        <Skeleton.Image
          className="absolute top-0 left-0 !w-full !h-full px-2"
          active={imageUrl ? skeletonActive : false}
        />
      )}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={alt || 'img'}
          width={width}
          height={height}
          onLoad={onLoad}
          onError={onError}
        />
      ) : (
        <div className={`w-[${width}px] h-[${height}px]`}></div>
      )}
    </div>
  );
}

export default React.memo(SkeletonImage);
