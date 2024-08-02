import { useState } from "react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";

interface SkeletonAndProductImageProps {
  src: string;
  alt: string
}

export function SkeletonAndProductImage({ src, alt }: SkeletonAndProductImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      {!imageLoaded && (
        <Skeleton
          width={520}
          height={655}
          style={{
            background: 'linear-gradient(100deg, #1ea483 0%, #7465d4 100%)',
            borderRadius: '8px'
          }}
        />
      )}
      <div style={{ position: 'relative', width: '520px', height: '480px' }}>
        <Image
          src={src}
          fill
          alt={alt}
          onLoad={() => setImageLoaded(true)}
          style={{
            objectFit: 'cover', opacity: imageLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease'
          }}
        />
      </div>
    </>
  );
}