
import React from 'react';
import { Check } from 'lucide-react';

interface TopProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const TopProgressIndicator: React.FC<TopProgressIndicatorProps> = ({ currentStep, totalSteps }) => {
  const stepLabels = [
    { title: 'YOUR INFO', subtitle: 'Personal Info' },
    { title: 'DIABETES RISK', subtitle: 'Diabetes Risk' },
    { title: 'HEART HEALTH', subtitle: 'Heart Health' },
    { title: 'SUMMARY', subtitle: 'Results' }
  ];

  return (
    <div className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 py-4 px-4 md:py-6 md:px-8">
      {/* Background decorative elements - hidden on mobile */}
      <div className="absolute top-0 left-0 w-16 h-16 bg-orange-400 rounded-full opacity-60 -mt-8 -ml-8 hidden md:block"></div>
      <div className="absolute top-2 right-8 w-4 h-4 bg-white rounded transform rotate-45 opacity-60 hidden md:block"></div>
      <div className="absolute top-4 right-4 w-2 h-2 bg-pink-300 rounded transform rotate-45 opacity-80 hidden md:block"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Mobile Progress - Single row with dots */}
        <div className="flex md:hidden items-center justify-center space-x-4">
          {stepLabels.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm transition-all duration-300 ${
                  index + 1 < currentStep
                    ? 'bg-white/30 backdrop-blur-sm'
                    : index + 1 === currentStep
                    ? 'bg-white text-blue-600 shadow-lg'
                    : 'bg-white/20 backdrop-blur-sm'
                }`}
              >
                {index + 1 < currentStep ? (
                  <Check size={14} className="text-white" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span className={`mt-1 text-xs font-medium ${
                index + 1 <= currentStep ? 'text-white' : 'text-white/60'
              }`}>
                {step.title.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>

        {/* Tablet and Desktop Progress - Horizontal layout */}
        <div className="hidden md:flex items-center justify-between lg:justify-center lg:space-x-12">
          {stepLabels.map((step, index) => (
            <React.Fragment key={index}>
              <div className="flex items-center space-x-3 lg:space-x-4">
                <div
                  className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-white font-bold text-sm lg:text-lg transition-all duration-300 ${
                    index + 1 < currentStep
                      ? 'bg-white/30 backdrop-blur-sm'
                      : index + 1 === currentStep
                      ? 'bg-white text-blue-600 shadow-lg'
                      : 'bg-white/20 backdrop-blur-sm'
                  }`}
                >
                  {index + 1 < currentStep ? (
                    <Check size={16} className="text-white lg:w-5 lg:h-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className={`text-xs lg:text-sm font-semibold tracking-wider ${
                    index + 1 <= currentStep ? 'text-white' : 'text-white/60'
                  }`}>
                    STEP {index + 1}
                  </span>
                  <span className={`text-sm lg:text-base font-medium ${
                    index + 1 <= currentStep ? 'text-white' : 'text-white/60'
                  }`}>
                    {step.title}
                  </span>
                </div>
              </div>
              {index < totalSteps - 1 && (
                <div
                  className={`hidden lg:block h-0.5 w-16 xl:w-24 transition-all duration-500 rounded-full ${
                    index + 1 < currentStep 
                      ? 'bg-white/40' 
                      : 'bg-white/20'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopProgressIndicator;
