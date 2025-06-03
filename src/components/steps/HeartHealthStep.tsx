import React, { useState } from "react";
import FormField from "../FormField";
import { Button } from "@/components/ui/button";

interface HeartHealthData {
  hypertension: string;
  cholesterol: string;
  diabetes: string;
  smoking: string;
  activity: string;
  familyHeartDiseaseHistory: string;
}

interface FormErrors {
  [key: string]: string;
}

const options = {
  hypertension: [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
    { value: "not_sure", label: "Not sure" },
  ],
  cholesterol: [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
    { value: "not_sure", label: "Not sure" },
  ],
  diabetes: [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
    { value: "not_sure", label: "Not sure" },
  ],
  smoking: [
    { value: "current", label: "Yes currently" },
    { value: "past", label: "Yes in the past" },
    { value: "no", label: "No" },
  ],
  activity: [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ],
  familyHeartDiseaseHistory: [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
    { value: "not_sure", label: "Not sure" },
  ],
};

function validateStep2(form: HeartHealthData): FormErrors {
  const errors: FormErrors = {};

  // Check required fields
  const requiredFields = [
    "hypertension",
    "cholesterol",
    "diabetes",
    "smoking",
    "activity",
    "familyHeartDiseaseHistory",
  ];

  for (const field of requiredFields) {
    if (
      !form[field as keyof HeartHealthData] ||
      form[field as keyof HeartHealthData].trim() === ""
    ) {
      errors[field] = "Please select an option";
    }
  }

  return errors;
}

interface HeartHealthStepProps {
  data: HeartHealthData;
  updateData: (data: Partial<HeartHealthData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const HeartHealthStep: React.FC<HeartHealthStepProps> = ({
  data,
  updateData,
  onNext,
  onPrevious,
}) => {
  const [errors, setErrors] = useState<FormErrors>({});

  const handleFieldChange = (field: keyof HeartHealthData, value: string) => {
    // Clear the error for this field when user selects an option
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
    updateData({ [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateStep2(data);

    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      onNext();
    } else {
      setErrors(validationErrors);
      // Scroll to the first error
      const firstErrorField = document.querySelector(".border-red-500");
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const renderOptionButtons = (
    field: keyof HeartHealthData,
    question: string
  ) => {
    const fieldOptions = options[field];
    return (
      <FormField label={question} required error={errors[field]}>
        <div className="flex flex-wrap gap-3">
          {fieldOptions.map((option) => (
            <Button
              key={option.value}
              type="button"
              variant={data[field] === option.value ? "default" : "outline"}
              className={`min-w-[120px] ${
                data[field] === option.value
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              } ${errors[field] ? "border-red-500" : ""}`}
              onClick={() => handleFieldChange(field, option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </FormField>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {renderOptionButtons(
        "hypertension",
        "Do you have high blood pressure (hypertension) history?"
      )}

      {renderOptionButtons(
        "cholesterol",
        "Have you ever been diagnosed with high cholesterol or been told you have abnormal lipid level?"
      )}

      {renderOptionButtons("diabetes", "Do you have diabetes or prediabetes?")}

      {renderOptionButtons(
        "smoking",
        "Do you currently smoke or have a history of smoking?"
      )}

      {renderOptionButtons(
        "activity",
        "Do you engage in regular physical activity (e.g., at least 150 minutes of moderate activity per week)?"
      )}

      {renderOptionButtons(
        "familyHeartDiseaseHistory",
        "Does anyone in your immediate family (parents, siblings) have a history of heart disease or heart attack before age 55 (for men) or 65 (for women)?"
      )}

      <div className="flex justify-between pt-6">
        <Button
          type="button"
          onClick={onPrevious}
          variant="outline"
          className="px-6 py-3 text-base font-medium rounded-lg border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
        >
          Previous
        </Button>
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-base font-medium shadow-sm hover:shadow-md transition-all duration-200"
        >
          Next Step
        </Button>
      </div>
    </form>
  );
};

export default HeartHealthStep;
