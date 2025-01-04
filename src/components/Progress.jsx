import React from 'react';

const Progress = React.forwardRef(({ 
  value = 0, 
  max = 100,
  className = '', 
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      className={`relative w-full overflow-hidden rounded-full bg-secondary h-4 ${className}`}
      {...props}
    >
      <div
        className="h-full w-full flex-1 bg-custom-gradient transition-all"
        style={{ 
          transform: `translateX(-${100 - (value || 0)}%)`,
        }}
      />
    </div>
  );
});

Progress.displayName = "Progress";

export { Progress };