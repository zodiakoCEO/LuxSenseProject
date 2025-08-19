import React from 'react';

interface IconProps {
  name: 'user' | 'moon';
  className?: string;
  onClick?: () => void;
}

const Icon: React.FC<IconProps> = ({ name, className, onClick }) => {
  const iconContent = name === 'user' ? '👤' : '🌙';
  return (
    <span
      className={`text-2xl cursor-pointer text-white hover:text-gray-300 ${className || ''}`}
      onClick={onClick}
    >
      {iconContent}
    </span>
  );
};

export default Icon;