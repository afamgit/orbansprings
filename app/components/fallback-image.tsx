'use client'

import Image from "next/image";
import { useState } from "react";

const fallback = require("/public/noimage.png");


function OptimizedImageWithFallback({ src, alt, height, width, classname}: {src:string, alt:string, height:number, width:number, classname:string}) {
    const [imageError, setImageError] = useState(false);

    return (
      <div
        style={{
          position: "relative",
        }}
      >
        <Image
          src={imageError ? fallback : src }
          alt={alt}
          width={width ? width : 500}
          height={height ? height : 500}
          objectFit='cover'
          onError={() => setImageError(true)}
          className={classname}
        />
      </div>
    );
  }
  
  export default OptimizedImageWithFallback;