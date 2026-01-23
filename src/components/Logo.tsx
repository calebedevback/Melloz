import React from 'react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', showText = true, className = '' }) => {
  // Size configurations
  const sizes = {
    small: { icon: "w-6 h-6", text: "text-lg" },
    medium: { icon: "w-8 h-8", text: "text-2xl" },
    large: { icon: "w-24 h-24", text: "text-5xl" },
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Geometric Logo Icon based on provided image */}
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className={`${currentSize.icon} drop-shadow-[0_0_10px_rgba(139,92,246,0.3)]`}
      >
        <defs>
          <linearGradient id="melloz_gradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#60A5FA" />   {/* Blue-400 */}
            <stop offset="50%" stopColor="#8B5CF6" />  {/* Violet-500 */}
            <stop offset="100%" stopColor="#E879F9" /> {/* Fuchsia-400 */}
          </linearGradient>
        </defs>
        
        {/* Main Outline Path - Stylized Fox/Heart */}
        <path 
          d="M50 85L20 45L35 25L50 40L65 25L80 45L50 85Z" 
          stroke="url(#melloz_gradient)" 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        
        {/* Internal Geometry - Y Shape */}
        <path 
          d="M50 40V40 M20 45L50 55L80 45 M50 55V85" 
          stroke="url(#melloz_gradient)" 
          strokeWidth="4" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="opacity-80"
        />
        
        {/* Top details */}
        <path 
          d="M35 25L50 55L65 25" 
          stroke="url(#melloz_gradient)" 
          strokeWidth="4" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="opacity-60"
        />
      </svg>

      {showText && (
        <span className={`font-sans font-medium text-white tracking-wide ${currentSize.text}`}>
          Melloz
        </span>
      )}
    </div>
  );
};

export default Logo;