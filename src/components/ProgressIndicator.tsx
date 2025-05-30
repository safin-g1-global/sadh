
import React from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center justify-center mb-8">
      {Array.from({ length: totalSteps }, (_, index) => (
        <React.Fragment key={index}>
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold transition-all duration-300 ${
              index + 1 <= currentStep
                ? 'bg-blue-600'
                : 'bg-gray-300'
            }`}
          >
            {index + 1}
          </div>
          {index < totalSteps - 1 && (
            <div
              className={`h-1 w-20 transition-all duration-300 ${
                index + 1 < currentStep ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressIndicator;
