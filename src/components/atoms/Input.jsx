import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  type = "text",
  className,
  error = false,
  ...props 
}, ref) => {
  const baseStyles = "w-full px-3 py-2.5 border rounded-lg text-sm transition-all duration-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1";
  
  const variants = error 
    ? "border-red-300 focus:border-red-500 focus:ring-red-500 bg-red-50" 
    : "border-gray-300 focus:border-primary-500 focus:ring-primary-500 bg-white hover:border-gray-400";

  return (
    <input
      type={type}
      ref={ref}
      className={cn(baseStyles, variants, className)}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;