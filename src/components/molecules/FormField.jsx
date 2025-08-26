import React from "react";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import { cn } from "@/utils/cn";

const FormField = ({ 
  label, 
  error, 
  required = false,
  className,
  children,
  ...inputProps 
}) => {
  return (
    <div className={cn("space-y-1", className)}>
      {label && <Label required={required}>{label}</Label>}
      {children || <Input error={!!error} {...inputProps} />}
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
};

export default FormField;