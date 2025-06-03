import React from "react";
import { Check } from "lucide-react";

interface SidebarProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const SidebarProgressIndicator: React.FC<SidebarProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
}) => {
  const stepLabels = [
    { title: "YOUR INFO", subtitle: "Personal Info" },
    { title: "DIABETES RISK", subtitle: "Diabetes Risk" },
    { title: "HEART HEALTH", subtitle: "Heart Health" },
    { title: "SUMMARY", subtitle: "Results" },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
      {stepLabels.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex items-center w-full sm:w-auto">
            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg transition-all duration-300 ${
                index + 1 < currentStep
                  ? "bg-white/30 backdrop-blur-sm"
                  : index + 1 === currentStep
                  ? "bg-white text-blue-600 shadow-lg"
                  : "bg-white/20 backdrop-blur-sm"
              }`}
            >
              {index + 1 < currentStep ? (
                <Check size={18} className="text-white sm:w-5 sm:h-5" />
              ) : (
                <span className={index + 1 === currentStep && "text-blue-600"}>
                  {index + 1}
                </span>
              )}
            </div>
            <div className="ml-3 sm:ml-4">
              <span
                className={`text-xs sm:text-sm font-semibold tracking-wider ${
                  index + 1 <= currentStep ? "text-white" : "text-white/60"
                }`}
              >
                STEP {index + 1}
              </span>
              <span
                className={`block text-sm sm:text-base font-medium ${
                  index + 1 <= currentStep ? "text-white" : "text-white/60"
                }`}
              >
                {step.title}
              </span>
            </div>
          </div>
          {index < stepLabels.length - 1 && (
            <div className="hidden sm:block flex-1 mx-4 h-0.5 bg-white/20">
              <div
                className="h-full bg-white/30 transition-all duration-200"
                style={{
                  width: index + 1 < currentStep ? "100%" : "0%",
                }}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default SidebarProgressIndicator;
