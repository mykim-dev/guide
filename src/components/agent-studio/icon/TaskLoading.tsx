
import React from 'react';

interface TaskLoadingProps {
  width?: number;
  height?: number;
  className?: string;
}

export const TaskLoading: React.FC<TaskLoadingProps> = ({ 
  width = 32, 
  height = 16, 
  className = "" 
}) => {
  return (
    <div className={`flex items-center gap-0.5 w-fit ${className}`}>
      <svg 
        width={width} 
        height={height} 
        viewBox="0 0 32 16" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="inline-flex"
      >
        <rect 
          x="2" 
          y="6" 
          width="6" 
          height="6" 
          rx="3" 
          fill="#7389FB"
          className="animate-bounce"
          style={{ animationDelay: '-0.32s', animationDuration: '1.4s' }}
        />
        <rect 
          x="13" 
          y="6" 
          width="6" 
          height="6" 
          rx="3" 
          fill="#92A3FC"
          className="animate-bounce"
          style={{ animationDelay: '-0.16s', animationDuration: '1.4s' }}
        />
        <rect 
          x="24" 
          y="6" 
          width="6" 
          height="6" 
          rx="3" 
          fill="#B1BEFD"
          className="animate-bounce"
          style={{ animationDelay: '0s', animationDuration: '1.4s' }}
        />
      </svg>
    </div>
  );
};
