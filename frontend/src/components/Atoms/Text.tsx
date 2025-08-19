import React from 'react';

interface TextProps {
  content: string;
  variant?: 'h1' | 'h2' | 'p' | 'span';
  className?: string;
}

const Text: React.FC<TextProps> = ({ content, variant = 'p', className }) => {
  const Tag = variant;
  const baseClasses = 'text-gray-800';
  const variantClasses = {
    h1: 'text-3xl font-bold',
    h2: 'text-2xl font-semibold',
    p: 'text-base',
    span: 'text-sm',
  }[variant];

  return <Tag className={`${baseClasses} ${variantClasses} ${className || ''}`}>{content}</Tag>;
};

export default Text;