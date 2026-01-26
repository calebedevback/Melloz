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
      {/* Sua Logo Personalizada - como Instagram */}
      <img 
        src="/src/assets/logoo.png"
        alt="Melloz Logo"
        className={`${currentSize.icon} object-contain`}
      />

      {showText && (
        <span className={`font-sans font-medium text-white tracking-wide ${currentSize.text}`}>
          Melloz
        </span>
      )}
    </div>
  );
};

export default Logo;