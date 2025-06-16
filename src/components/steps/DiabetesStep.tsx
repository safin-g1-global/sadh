import React, { useState } from "react";
import FormField from "../FormField";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DiabetesData {
  waist: string;
  activityType: string;
  familyDiabetesHistory: string;
}

interface FormErrors {
  [key: string]: string;
}

function validateStep2(form: DiabetesData): FormErrors {
  const errors: FormErrors = {};

  // Check required fields
  const requiredFields = ["waist", "activityType", "familyDiabetesHistory"];

  for (const field of requiredFields) {
    if (
      !form[field as keyof DiabetesData] ||
      form[field as keyof DiabetesData].trim() === ""
    ) {
      errors[field] = "This field is required";
    }
  }

  return errors;
}

interface DiabetesStepProps {
  data: DiabetesData;
  gender: string;
  updateData: (data: Partial<DiabetesData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const DiabetesStep: React.FC<DiabetesStepProps> = ({
  data,
  updateData,
  onNext,
  onPrevious,
  gender,
}) => {
  const [errors, setErrors] = useState<FormErrors>({});

  const handleFieldChange = (field: keyof DiabetesData, value: string) => {
    // Clear the error for this field when user starts typing
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

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <FormField
        label="Abdominal Obesity/Waist Circumference"
        required
        error={errors.waist}
      >
        <Select
          value={data.waist}
          onValueChange={(value) => handleFieldChange("waist", value)}
        >
          <SelectTrigger
            className={`h-12 text-base border-gray-300 focus:border-blue-500 rounded-lg ${
              errors.abdominalObesity ? "border-red-500" : ""
            }`}
          >
            <SelectValue placeholder="Select your waist measurement category" />
          </SelectTrigger>
          <SelectContent className="rounded-lg border-2">
            <SelectItem value={gender === "male" ? "<90" : "<80"}>
              {gender === "male" ? "Waist < 90 cm" : "Waist < 80 cm"}
            </SelectItem>
            <SelectItem value={gender === "male" ? "90-99" : "80-89"}>
              {gender === "male" ? "Waist 90-99 cm" : "Waist 80-89 cm"}
            </SelectItem>
            <SelectItem value={gender === "male" ? ">=100" : ">=90"}>
              {gender === "male" ? ">= 100 cm" : "Waist >=90 cm"}
            </SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      <FormField label="Physical Activity" required error={errors.activityType}>
        <Select
          value={data.activityType}
          onValueChange={(value) => handleFieldChange("activityType", value)}
        >
          <SelectTrigger
            className={`h-12 text-base border-gray-300 focus:border-blue-500 rounded-lg ${
              errors.physicalActivity ? "border-red-500" : ""
            }`}
          >
            <SelectValue placeholder="Select your activity level" />
          </SelectTrigger>
          <SelectContent className="rounded-lg border-2">
            <SelectItem value="vigorous">Vigorous Exercise</SelectItem>
            <SelectItem value="moderate">Moderate Exercise</SelectItem>
            <SelectItem value="mild">Mild Exercise</SelectItem>
            <SelectItem value="none">No Exercise</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      <FormField
        label="Family History of Diabetes"
        required
        error={errors.familyDiabetesHistory}
      >
        <Select
          value={data.familyDiabetesHistory}
          onValueChange={(value) =>
            handleFieldChange("familyDiabetesHistory", value)
          }
        >
          <SelectTrigger
            className={`h-12 text-base border-gray-300 focus:border-blue-500 rounded-lg ${
              errors.familyHistory ? "border-red-500" : ""
            }`}
          >
            <SelectValue placeholder="Select family history" />
          </SelectTrigger>
          <SelectContent className="rounded-lg border-2">
            <SelectItem value="none">No diabetes in parents</SelectItem>
            <SelectItem value="one">One parent is diabetic</SelectItem>
            <SelectItem value="both">Both parents are diabetic</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

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

export default DiabetesStep;
