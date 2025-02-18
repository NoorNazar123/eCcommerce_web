import React from 'react';

type Size = 'small' | 'medium' | 'large';
type Color = 'blue' | 'green' | 'red' | 'yellow' | 'indigo' | 'purple' | 'pink';

const sizeClasses: Record<Size, string> = {
  small: 'h-8 w-8 border-t-2',
  medium: 'h-12 w-12 border-t-4',
  large: 'h-16 w-16 border-t-6',
};

const colorClasses: Record<Color, string> = {
  blue: 'border-blue-500',
  green: 'border-green-500',
  red: 'border-red-500',
  yellow: 'border-yellow-500',
  indigo: 'border-indigo-500',
  purple: 'border-purple-500',
  pink: 'border-pink-500',
};

interface LoadingSkeletonProps {
  size?: Size;
  color?: Color;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  size = 'medium',
  color = 'blue',
}) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]} border-solid border-gray-900`}
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
