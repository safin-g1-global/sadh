
import React, { useState } from 'react';
import SidebarProgressIndicator from './SidebarProgressIndicator';
import DemographicStep from './steps/DemographicStep';
import DiabetesStep from './steps/DiabetesStep';
import HeartHealthStep from './steps/HeartHealthStep';
import ResultsStep from './steps/ResultsStep';

interface FormData {
  demographic: {
    firstName: string;
    lastName: string;
    age: string;
    gender: string;
    city: string;
    state: string;
    language: string;
    countryOfOrigin: string;
    phone: string;
    email: string;
    religion: string;
    contactPreference: string;
  };
  diabetes: {
    abdominalObesity: string;
    physicalActivity: string;
    familyHistory: string;
  };
  heartHealth: {
    highBloodPressure: string;
    cholesterol: string;
    diabetes: string;
    smoking: string;
    physicalActivity: string;
    familyHeartHistory: string;
  };
}

const HealthRiskForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    demographic: {
      firstName: '',
      lastName: '',
      age: '',
      gender: '',
      city: '',
      state: '',
      language: '',
      countryOfOrigin: '',
      phone: '',
      email: '',
      religion: '',
      contactPreference: '',
    },
    diabetes: {
      abdominalObesity: '',
      physicalActivity: '',
      familyHistory: '',
    },
    heartHealth: {
      highBloodPressure: '',
      cholesterol: '',
      diabetes: '',
      smoking: '',
      physicalActivity: '',
      familyHeartHistory: '',
    },
  });

  const updateDemographicData = (data: Partial<FormData['demographic']>) => {
    setFormData(prev => ({
      ...prev,
      demographic: { ...prev.demographic, ...data }
    }));
  };

  const updateDiabetesData = (data: Partial<FormData['diabetes']>) => {
    setFormData(prev => ({
      ...prev,
      diabetes: { ...prev.diabetes, ...data }
    }));
  };

  const updateHeartHealthData = (data: Partial<FormData['heartHealth']>) => {
    setFormData(prev => ({
      ...prev,
      heartHealth: { ...prev.heartHealth, ...data }
    }));
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);
  const resetForm = () => {
    setCurrentStep(1);
    setFormData({
      demographic: {
        firstName: '',
        lastName: '',
        age: '',
        gender: '',
        city: '',
        state: '',
        language: '',
        countryOfOrigin: '',
        phone: '',
        email: '',
        religion: '',
        contactPreference: '',
      },
      diabetes: {
        abdominalObesity: '',
        physicalActivity: '',
        familyHistory: '',
      },
      heartHealth: {
        highBloodPressure: '',
        cholesterol: '',
        diabetes: '',
        smoking: '',
        physicalActivity: '',
        familyHeartHistory: '',
      },
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <DemographicStep
            data={formData.demographic}
            updateData={updateDemographicData}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <DiabetesStep
            data={formData.diabetes}
            updateData={updateDiabetesData}
            onNext={nextStep}
            onPrevious={prevStep}
          />
        );
      case 3:
        return (
          <HeartHealthStep
            data={formData.heartHealth}
            updateData={updateHeartHealthData}
            onNext={nextStep}
            onPrevious={prevStep}
          />
        );
      case 4:
        return (
          <ResultsStep
            demographicData={formData.demographic}
            diabetesData={formData.diabetes}
            heartHealthData={formData.heartHealth}
            onReset={resetForm}
          />
        );
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Personal info';
      case 2:
        return 'Diabetes Risk Assessment';
      case 3:
        return 'Heart Health Assessment';
      case 4:
        return 'Health Risk Summary';
      default:
        return '';
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1:
        return 'Please provide your name, email address, and phone number.';
      case 2:
        return 'Help us assess your diabetes risk with these questions.';
      case 3:
        return 'Let us evaluate your heart health with these assessments.';
      case 4:
        return 'Review your personalized health risk assessment results.';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <SidebarProgressIndicator currentStep={currentStep} totalSteps={4} />
      
      <main className="flex-1 p-8">
        {currentStep < 4 ? (
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {getStepTitle()}
              </h1>
              <p className="text-gray-600 text-lg">
                {getStepDescription()}
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              {renderStep()}
            </div>
          </div>
        ) : (
          <div className="w-full">
            {renderStep()}
          </div>
        )}
      </main>
    </div>
  );
};

export default HealthRiskForm;
