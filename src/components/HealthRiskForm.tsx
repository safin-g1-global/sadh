
import React, { useState } from 'react';
import Header from './Header';
import ProgressIndicator from './ProgressIndicator';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      
      <main className="max-w-6xl mx-auto px-6 py-12">
        {currentStep < 4 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-8">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Take the Risk Test
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                Please fill in this short form so that we can send you a detailed report for your health.
              </p>
            </div>
            
            <ProgressIndicator currentStep={currentStep} totalSteps={3} />
            
            <div className="transition-all duration-500 ease-in-out">
              {renderStep()}
            </div>
          </div>
        )}
        
        {currentStep === 4 && renderStep()}
      </main>
    </div>
  );
};

export default HealthRiskForm;
