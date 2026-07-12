import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../utils/helpers';

const sizeMap = {
  sm: { icon: 14, gap: 'gap-0.5' },
  md: { icon: 18, gap: 'gap-0.5' },
  lg: { icon: 24, gap: 'gap-1' },
};

function StarRating({
  rating = 0,
  maxStars = 5,
  size = 'md',
  interactive = false,
  onChange = null,
  className = '',
}) {
  const [hoverRating, setHoverRating] = useState(0);
  const styles = sizeMap[size] || sizeMap.md;
  const displayRating = hoverRating || rating;

  const handleClick = (starIndex) => {
    if (!interactive || !onChange) return;
    onChange(starIndex);
  };

  const handleMouseEnter = (starIndex) => {
    if (!interactive) return;
    setHoverRating(starIndex);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    setHoverRating(0);
  };

  const handleKeyDown = (e, starIndex) => {
    if (!interactive || !onChange) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onChange(starIndex);
    }
  };

  return (
    <div
      className={cn('inline-flex items-center', styles.gap, className)}
      role={interactive ? 'radiogroup' : 'img'}
      aria-label={`Rating: ${rating} out of ${maxStars} stars`}
      onMouseLeave={handleMouseLeave}
    >
      {Array.from({ length: maxStars }, (_, i) => {
        const starIndex = i + 1;
        const fillPercent = Math.min(
          Math.max(displayRating - i, 0),
          1
        );

        // Determine fill type
        const isFull = fillPercent >= 1;
        const isHalf = fillPercent > 0 && fillPercent < 1;
        const isEmpty = fillPercent <= 0;

        return (
          <span
            key={i}
            className={cn(
              'relative inline-flex flex-shrink-0',
              interactive && 'cursor-pointer'
            )}
            onClick={() => handleClick(starIndex)}
            onMouseEnter={() => handleMouseEnter(starIndex)}
            onKeyDown={(e) => handleKeyDown(e, starIndex)}
            tabIndex={interactive ? 0 : undefined}
            role={interactive ? 'radio' : undefined}
            aria-checked={interactive ? starIndex <= rating : undefined}
            aria-label={interactive ? `${starIndex} star${starIndex !== 1 ? 's' : ''}` : undefined}
          >
            {/* Background empty star */}
            <Star
              size={styles.icon}
              className="text-gray-300"
              strokeWidth={1.5}
              fill="currentColor"
            />

            {/* Foreground filled star — clipped for half support */}
            {!isEmpty && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fillPercent * 100}%` }}
              >
                <Star
                  size={styles.icon}
                  className="text-amber-400"
                  strokeWidth={1.5}
                  fill="currentColor"
                />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

export default StarRating;
