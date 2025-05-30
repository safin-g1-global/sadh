
import React from 'react';

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({ label, children, required = false }) => {
  return (
    <div className="space-y-2">
      <label className="block text-gray-900 font-medium text-base">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        {children}
      </div>
    </div>
  );
};

export default FormField;
