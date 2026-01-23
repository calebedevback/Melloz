import React from 'react';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  circle?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({ 
  width = '100%', 
  height = '16px', 
  className = '',
  circle = false 
}) => {
  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div
      style={style}
      className={`
        animate-shimmer bg-gradient-to-r from-night-800 via-night-700 to-night-800
        rounded-lg ${circle ? 'rounded-full' : ''} ${className}
      `}
    />
  );
};

// Card Skeleton for Event Cards
export const EventCardSkeleton: React.FC = () => (
  <div className="w-full h-[28rem] bg-night-900 rounded-[2rem] border border-white/5 p-6 flex flex-col justify-between mb-8 overflow-hidden">
    <div>
      <div className="flex justify-between items-start mb-4">
        <Skeleton width={100} height={32} />
        <Skeleton width={80} height={32} />
      </div>
      <Skeleton width="100%" height={200} className="mb-4" />
    </div>
    <div>
      <Skeleton width="70%" height={24} className="mb-3" />
      <Skeleton width="50%" height={16} className="mb-6" />
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Skeleton width={40} height={40} circle className="shrink-0" />
          <Skeleton width={40} height={40} circle className="shrink-0" />
          <Skeleton width={40} height={40} circle className="shrink-0" />
        </div>
        <Skeleton width={80} height={48} />
      </div>
    </div>
  </div>
);

// List Skeleton
export const ListSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="flex gap-4">
        <Skeleton width={60} height={60} circle />
        <div className="flex-1">
          <Skeleton width="80%" height={18} className="mb-2" />
          <Skeleton width="60%" height={14} />
        </div>
      </div>
    ))}
  </div>
);

export default Skeleton;
