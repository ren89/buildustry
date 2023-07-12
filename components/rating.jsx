import React from "react";

const Rating = ({ value }) => {
  const maxStars = 5;
  const filledStars = Math.floor(value);
  const hasHalfStar = value - filledStars >= 0.5;
  const emptyStars = maxStars - filledStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="rating flex">
      {[...Array(filledStars)].map((_, index) => (
        <svg
          key={index}
          className="w-5 h-5 fill-current text-yellow-500"
          viewBox="0 0 24 24"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M12 17.27l-5.49 3.32 1.42-6.17L2.5 9.64l6.22-.54L12 3l2.28 5.1 6.22.54-4.43 3.78 1.42 6.17L12 17.27zm0 2.73L3.5 23l1.42-6.17L3.5 10 .78 3.78 7 3.24 12 0l5.01 3.24 6.21.54L22.5 10l-4.43 3.78 1.42 6.17L12 20zM12 5.91l-1.74 1.67.41-2.14-1.39-1.2 1.83-.16.89-1.72.89 1.73 1.83.16-1.4 1.19.41 2.14L12 5.91z" />
        </svg>
      ))}
      {hasHalfStar && (
        <svg
          className="w-5 h-5 fill-current text-yellow-500"
          viewBox="0 0 24 24"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M12 17.27l-5.49 3.32 1.42-6.17L2.5 9.64l6.22-.54L12 3l2.28 5.1 6.22.54-4.43 3.78 1.42 6.17L12 17.27zm0 2.73L3.5 23l1.42-6.17L3.5 10 .78 3.78 7 3.24 12 0l5.01 3.24 6.21.54L22.5 10l-4.43 3.78 1.42 6.17L12 20zM12 5.91l-1.74 1.67.41-2.14-1.39-1.2 1.83-.16.89-1.72.89 1.73 1.83.16-1.4 1.19.41 2.14L12 5.91z" />
        </svg>
      )}
      {[...Array(emptyStars)].map((_, index) => (
        <svg
          key={index}
          className="w-5 h-5 fill-current text-gray-300"
          viewBox="0 0 24 24"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M12 17.27l-5.49 3.32 1.42-6.17L2.5 9.64l6.22-.54L12 3l2.28 5.1 6.22.54-4.43 3.78 1.42 6.17L12 17.27zm0 2.73L3.5 23l1.42-6.17L3.5 10 .78 3.78 7 3.24 12 0l5.01 3.24 6.21.54L22.5 10l-4.43 3.78 1.42 6.17L12 20zM12 5.91l-1.74 1.67.41-2.14-1.39-1.2 1.83-.16.89-1.72.89 1.73 1.83.16-1.4 1.19.41 2.14L12 5.91z" />
        </svg>
      ))}
    </div>
  );
};

export default Rating;
