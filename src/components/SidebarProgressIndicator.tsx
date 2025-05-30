
import React from 'react';
import { Check } from 'lucide-react';

interface SidebarProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const SidebarProgressIndicator: React.FC<SidebarProgressIndicatorProps> = ({ currentStep, totalSteps }) => {
  const stepLabels = [
    { title: 'YOUR INFO', subtitle: 'Personal Info' },
    { title: 'DIABETES RISK', subtitle: 'Diabetes Risk' },
    { title: 'HEART HEALTH', subtitle: 'Heart Health' },
    { title: 'SUMMARY', subtitle: 'Results' }
  ];

  return (
    <div className="w-80 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 min-h-screen p-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-400 rounded-full opacity-80 -mb-16 -ml-16"></div>
      <div className="absolute bottom-8 right-8 w-8 h-8 bg-white rounded transform rotate-45 opacity-60"></div>
      <div className="absolute bottom-16 right-4 w-4 h-4 bg-pink-300 rounded transform rotate-45 opacity-80"></div>
      <div className="absolute top-1/2 right-0 w-24 h-24 bg-pink-400 rounded-full opacity-60 -mr-12"></div>
      
      <div className="relative z-10">
        <div className="space-y-8 mt-12">
          {stepLabels.map((step, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg transition-all duration-300 ${
                  index + 1 < currentStep
                    ? 'bg-white/30 backdrop-blur-sm'
                    : index + 1 === currentStep
                    ? 'bg-white text-blue-600 shadow-lg'
                    : 'bg-white/20 backdrop-blur-sm'
                }`}
              >
                {index + 1 < currentStep ? (
                  <Check size={20} className="text-white" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <div className="flex flex-col">
                <span className={`text-sm font-semibold tracking-wider ${
                  index + 1 <= currentStep ? 'text-white' : 'text-white/60'
                }`}>
                  STEP {index + 1}
                </span>
                <span className={`text-base font-medium ${
                  index + 1 <= currentStep ? 'text-white' : 'text-white/60'
                }`}>
                  {step.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarProgressIndicator;
