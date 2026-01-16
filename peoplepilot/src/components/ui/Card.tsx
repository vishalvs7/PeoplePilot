import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
}

export function Card({
  children,
  className = '',
  padding = 'md',
  shadow = 'md',
  border = true,
}: CardProps) {
  // Padding styles
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  // Shadow styles
  const shadowStyles = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  };
  
  // Border style
  const borderStyle = border ? 'border border-gray-200' : '';
  
  // Combine all styles
  const combinedClassName = `
    bg-white rounded-xl
    ${paddingStyles[padding]}
    ${shadowStyles[shadow]}
    ${borderStyle}
    ${className}
  `.trim();

  return (
    <div className={combinedClassName}>
      {children}
    </div>
  );
}