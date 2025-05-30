
import React from 'react';

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({ label, children, required = false }) => {
  return (
    <div className="mb-6">
      <label className="block text-gray-800 font-semibold mb-3 text-lg">
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
