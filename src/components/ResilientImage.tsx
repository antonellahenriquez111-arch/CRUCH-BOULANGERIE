import { useState } from 'react';
import { Wheat } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#EDE5D8] text-[#4A151B] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Wheat className="w-8 h-8 opacity-60 mb-2" strokeWidth={1.5} />
        {fallbackTitle && (
          <span className="font-serif text-base font-semibold text-[#231917] max-w-[18ch]">
            {fallbackTitle}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
