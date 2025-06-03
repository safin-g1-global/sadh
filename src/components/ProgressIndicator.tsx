
import React from 'react';
import { Check } from 'lucide-react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep, totalSteps }) => {
  const stepLabels = ['Personal Info', 'Diabetes Risk', 'Heart Health'];

  return (
    <div className="flex items-center justify-center mb-12">
      <div className="flex items-center space-x-4">
        {Array.from({ length: totalSteps }, (_, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-semibold transition-all duration-500 shadow-lg ${
                  index + 1 < currentStep
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 scale-110'
                    : index + 1 === currentStep
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 scale-110 ring-4 ring-blue-200'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              >
                {index + 1 < currentStep ? (
                  <Check size={20} className="text-white" />
                ) : (
                  <span className="text-lg">{index + 1}</span>
                )}
              </div>
              <span className={`mt-3 text-sm font-medium transition-colors duration-300 ${
                index + 1 <= currentStep ? 'text-blue-600' : 'text-gray-500'
              }`}>
                {stepLabels[index]}
              </span>
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`h-1 w-24 transition-all duration-500 rounded-full ${
                  index + 1 < currentStep 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                    : 'bg-gray-300'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
