import React, { useState } from "react";
import SidebarProgressIndicator from "./SidebarProgressIndicator";
import DemographicStep from "./steps/DemographicStep";
import DiabetesStep from "./steps/DiabetesStep";
import HeartHealthStep from "./steps/HeartHealthStep";
import ResultsStep from "./steps/ResultsStep";
import ConsentDialog from "./ConsentDialog";
import EmailCollectionModal from "./EmailCollectionModal";
import { encryptField } from "@/utils/cryptoUtils";
import supabase from "@/supabase-client";

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
    waist: string;
    activityType: string;
    familyDiabetesHistory: string;
  };
  heartHealth: {
    hypertension: string;
    cholesterol: string;
    diabetes: string;
    smoking: string;
    activity: string;
    familyHeartDiseaseHistory: string;
  };
}

const HealthRiskForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showConsent, setShowConsent] = useState(true);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    demographic: {
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      city: "",
      state: "",
      language: "",
      countryOfOrigin: "",
      phone: "",
      email: "",
      religion: "",
      contactPreference: "",
    },
    diabetes: {
      waist: "",
      activityType: "",
      familyDiabetesHistory: "",
    },
    heartHealth: {
      hypertension: "",
      cholesterol: "",
      diabetes: "",
      smoking: "",
      activity: "",
      familyHeartDiseaseHistory: "",
    },
  });

  const updateDemographicData = (data: Partial<FormData["demographic"]>) => {
    setFormData((prev) => ({
      ...prev,
      demographic: { ...prev.demographic, ...data },
    }));
  };

  const updateDiabetesData = (data: Partial<FormData["diabetes"]>) => {
    setFormData((prev) => ({
      ...prev,
      diabetes: { ...prev.diabetes, ...data },
    }));
  };

  const updateHeartHealthData = (data: Partial<FormData["heartHealth"]>) => {
    setFormData((prev) => ({
      ...prev,
      heartHealth: { ...prev.heartHealth, ...data },
    }));
  };

  const handleConsentAccept = () => {
    setShowConsent(false);
  };

  const handleConsentDeny = () => {
    setShowConsent(false);
    setShowEmailModal(true);
  };

  const handleEmailModalClose = () => {
    setShowEmailModal(false);
  };

  const nextStep = async () => {
    setCurrentStep((prev) => prev + 1);
    // Scroll to top of the form
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (currentStep === 3) {
      const patientData = {
        first_name: encryptField(formData.demographic.firstName),
        last_name: encryptField(formData.demographic.lastName),
        gender: encryptField(formData.demographic.gender),
        age: formData.demographic.age,
        city: formData.demographic.city,
        state: formData.demographic.state,
        country: formData.demographic.countryOfOrigin,
        language: formData.demographic.language,
        religion: formData.demographic.religion,
        phone: encryptField(formData.demographic.phone),
        email: encryptField(formData.demographic.email),
        contact_preference: formData.demographic.contactPreference,
        waist: formData.diabetes.waist,
        activity_type: formData.diabetes.activityType,
        family_diabetes_history: formData.diabetes.familyDiabetesHistory,
        hypertension:
          formData.heartHealth.hypertension === "yes"
            ? 1
            : formData.heartHealth.hypertension === "no"
            ? 0
            : 0,
        diabetes:
          formData.heartHealth.diabetes === "yes"
            ? 1
            : formData.heartHealth.diabetes === "no"
            ? 0
            : 0,
        cholesterol:
          formData.heartHealth.cholesterol === "yes"
            ? 1
            : formData.heartHealth.cholesterol === "no"
            ? 0
            : 0,
        smoking:
          formData.heartHealth.smoking === "current" ||
          formData.heartHealth.smoking === "past"
            ? 1
            : formData.heartHealth.smoking === "no"
            ? 0
            : 0,
        activity:
          formData.heartHealth.activity === "yes"
            ? 1
            : formData.heartHealth.activity === "no"
            ? 0
            : 0,
        family_heart_disease_history:
          formData.heartHealth.familyHeartDiseaseHistory === "yes"
            ? 1
            : formData.heartHealth.familyHeartDiseaseHistory === "no"
            ? 0
            : 0,
      };

      const { error } = await supabase.from("patients").insert(patientData);
      console.log(error);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
    // Scroll to top of the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setCurrentStep(1);
    setFormData({
      demographic: {
        firstName: "",
        lastName: "",
        age: "",
        gender: "",
        city: "",
        state: "",
        language: "",
        countryOfOrigin: "",
        phone: "",
        email: "",
        religion: "",
        contactPreference: "",
      },
      diabetes: {
        waist: "",
        activityType: "",
        familyDiabetesHistory: "",
      },
      heartHealth: {
        hypertension: "",
        cholesterol: "",
        diabetes: "",
        smoking: "",
        activity: "",
        familyHeartDiseaseHistory: "",
      },
    });
  };

  const renderStep = () => {
    if (showConsent) {
      return (
        <ConsentDialog
          isOpen={showConsent}
          onAccept={handleConsentAccept}
          onDeny={handleConsentDeny}
        />
      );
    }

    if (showEmailModal) {
      return (
        <EmailCollectionModal
          isOpen={showEmailModal}
          onClose={handleEmailModalClose}
        />
      );
    }

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
            gender={formData.demographic.gender}
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
    if (showConsent) return "";
    if (showEmailModal) return "";

    switch (currentStep) {
      case 1:
        return "Personal info";
      case 2:
        return "Diabetes Risk Assessment";
      case 3:
        return "Heart Health Assessment";
      case 4:
        return "Health Risk Summary";
      default:
        return "";
    }
  };

  const getStepDescription = () => {
    if (showConsent) return "";
    if (showEmailModal) return "";

    switch (currentStep) {
      case 1:
        return "Please provide your name, email address, and phone number.";
      case 2:
        return "Help us assess your diabetes risk with these questions.";
      case 3:
        return "Let us evaluate your heart health with these assessments.";
      case 4:
        return "Review your personalized health risk assessment results.";
      default:
        return "";
    }
  };

  return (
    <div className="bg-gray-50 flex flex-col">
      {!showConsent && !showEmailModal && (
        <div className="w-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 py-4 md:py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SidebarProgressIndicator currentStep={currentStep} totalSteps={4} />
          </div>
        </div>
      )}

      <main className="flex-1 p-4 sm:p-6 md:p-8">
        {!showConsent && !showEmailModal && currentStep < 4 ? (
          <div className="max-w-2xl mx-auto">
            <div className="mb-4 md:mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {getStepTitle()}
              </h1>
              <p className="text-base md:text-lg text-gray-600">
                {getStepDescription()}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 md:p-8">
              {renderStep()}
            </div>
          </div>
        ) : (
          <div className="w-full">{renderStep()}</div>
        )}
      </main>
    </div>
  );
};

export default HealthRiskForm;
