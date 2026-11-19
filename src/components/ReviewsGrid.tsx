import { Star } from 'lucide-react';
import { ReviewItem } from '../data/bakeryData';

interface ReviewsGridProps {
  title: string;
  subtitle: string;
  reviews: ReviewItem[];
  titleClassName?: string;
}

export function ReviewsGrid({
  title,
  subtitle,
  reviews,
  titleClassName = 'text-[#231917]',
}: ReviewsGridProps) {
  return (
    <div>
      <div className="mb-8">
        <h2 className={`font-serif text-3xl sm:text-4xl font-semibold text-balance ${titleClassName}`}>
          {title}
        </h2>
        <p className="mt-2 text-base text-[#5C4E49] max-w-[58ch]">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <article
            key={rev.id}
            className="bg-white border border-[#E5DDD0] rounded-2xl p-6 flex flex-col justify-between gap-5"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-0.5 text-[#C88A4B]" aria-label={`${rev.rating} de 5 estrellas`}>
                  {Array.from({ length: rev.rating }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-[#C88A4B] text-[#C88A4B]" />
                  ))}
                </div>
                <span className="text-xs font-medium text-[#4A5D3F]">
                  {rev.productTag}
                </span>
              </div>

              <p className="text-sm sm:text-[15px] leading-relaxed text-[#231917]">
                “{rev.quote}”
              </p>
            </div>

            <div className="pt-4 border-t border-[#EFE8DC]">
              <p className="text-sm font-bold text-[#231917]">{rev.author}</p>
              <p className="text-xs text-[#5C4E49]">{rev.role}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
