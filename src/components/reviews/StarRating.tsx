import { Star, StarHalf } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: number;
  className?: string;
  showValue?: boolean;
}

const StarRating = ({
  rating,
  size = 20,
  className = "",
  showValue = false,
}: StarRatingProps) => {
  // Calculate full and half stars
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return (
            <Star
              key={i}
              size={size}
              className="text-yellow-400 fill-yellow-400"
            />
          );
        } else if (i === fullStars && hasHalfStar) {
          return (
            <StarHalf
              key={i}
              size={size}
              className="text-yellow-400 fill-yellow-400"
            />
          );
        } else {
          return <Star key={i} size={size} className="text-gray-300" />;
        }
      })}
      {showValue && (
        <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
      )}
    </div>
  );
};

export default StarRating;
