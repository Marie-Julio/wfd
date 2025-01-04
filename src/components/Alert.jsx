import React from 'react';

const Alert = React.forwardRef(({ 
  className = '',
  variant = 'default',
  ...props 
}, ref) => {
  const baseStyles = 'relative w-full rounded-lg border p-4';
  
  const variants = {
    default: 'bg-background text-foreground',
    destructive: 'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
  };

  return (
    <div
      ref={ref}
      role="alert"
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    />
  );
});
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef(({ 
  className = '',
  ...props 
}, ref) => (
  <h5
    ref={ref}
    className={`mb-1 font-medium leading-none tracking-tight ${className}`}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef(({ 
  className = '',
  ...props 
}, ref) => (
  <div
    ref={ref}
    className={`text-sm [&_p]:leading-relaxed ${className}`}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export {
  Alert,
  AlertTitle,
  AlertDescription,
};