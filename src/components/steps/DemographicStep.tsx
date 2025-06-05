import React, { useState } from "react";
import FormField from "../FormField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DemographicData {
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
}

interface FormErrors {
  [key: string]: string;
}

function validateStep1(form: DemographicData): FormErrors {
  const errors: FormErrors = {};

  // Check required fields
  const requiredFields = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "city",
    "state",
    // "language",
    // "countryOfOrigin",
    "phone",
    "email",
    // "religion",
    "contactPreference",
  ];

  for (const field of requiredFields) {
    if (
      !form[field as keyof DemographicData] ||
      form[field as keyof DemographicData].trim() === ""
    ) {
      errors[field] = "This field is required";
    }
  }

  // Max length validation
  const maxLen = 100;
  for (const key of [
    "firstName",
    "lastName",
    "city",
    "state",
    "language",
    "countryOfOrigin",
    "religion",
    "phone",
    "email",
    "contactPreference",
  ]) {
    if (
      form[key as keyof DemographicData] &&
      form[key as keyof DemographicData].length > maxLen
    ) {
      errors[key] = "Maximum 100 characters allowed.";
    }
  }

  // Phone: US only (10 digits, optional +1, dashes/spaces allowed)
  if (
    form.phone &&
    !/^\s*(\+1\s*)?\(?[2-9][0-9]{2}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}\s*$/.test(
      form.phone
    )
  ) {
    errors.phone = "Enter a valid US phone number.";
  }

  // Email
  if (form.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
    errors.email = "Enter a valid email address.";
  }

  return errors;
}

const usStatesAndTerritories = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
  { value: "DC", label: "District of Columbia" },
  { value: "AS", label: "American Samoa" },
  { value: "GU", label: "Guam" },
  { value: "MP", label: "Northern Mariana Islands" },
  { value: "PR", label: "Puerto Rico" },
  { value: "VI", label: "U.S. Virgin Islands" },
];

interface DemographicStepProps {
  data: DemographicData;
  updateData: (data: Partial<DemographicData>) => void;
  onNext: () => void;
}

const DemographicStep: React.FC<DemographicStepProps> = ({
  data,
  updateData,
  onNext,
}) => {
  const [errors, setErrors] = useState<FormErrors>({});

  const handleFieldChange = (field: keyof DemographicData, value: string) => {
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
    const validationErrors = validateStep1(data);

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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="First Name" required error={errors.firstName}>
          <Input
            type="text"
            placeholder="e.g. Stephen"
            value={data.firstName}
            onChange={(e) => handleFieldChange("firstName", e.target.value)}
            className={`h-12 text-base border-gray-300 focus:border-blue-500 rounded-lg ${
              errors.firstName ? "border-red-500" : ""
            }`}
          />
        </FormField>

        <FormField label="Last Name" required error={errors.lastName}>
          <Input
            type="text"
            placeholder="e.g. King"
            value={data.lastName}
            onChange={(e) => handleFieldChange("lastName", e.target.value)}
            className={`h-12 text-base border-gray-300 focus:border-blue-500 rounded-lg ${
              errors.lastName ? "border-red-500" : ""
            }`}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Email Address" required error={errors.email}>
          <Input
            type="email"
            placeholder="e.g. stephenking@lorem.com"
            value={data.email}
            onChange={(e) => handleFieldChange("email", e.target.value)}
            className={`h-12 text-base border-gray-300 focus:border-blue-500 rounded-lg ${
              errors.email ? "border-red-500" : ""
            }`}
          />
        </FormField>

        <FormField label="Phone Number" required error={errors.phone}>
          <Input
            type="tel"
            placeholder="e.g. +1 (555) 123-4567"
            value={data.phone}
            onChange={(e) => handleFieldChange("phone", e.target.value)}
            className={`h-12 text-base border-gray-300 focus:border-blue-500 rounded-lg ${
              errors.phone ? "border-red-500" : ""
            }`}
            maxLength={10}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* <FormField label="Age" required error={errors.age}>
          <Input
            type="number"
            placeholder="Enter your age"
            value={data.age}
            onChange={(e) => handleFieldChange("age", e.target.value)}
            className={`h-12 text-base border-gray-300 focus:border-blue-500 rounded-lg ${
              errors.age ? "border-red-500" : ""
            }`}
          />
        </FormField> */}

        <FormField label="Age" required error={errors.age}>
          <Select
            value={data.age}
            onValueChange={(value) => handleFieldChange("age", value)}
          >
            <SelectTrigger
              className={`h-12 text-base border-gray-300 focus:border-blue-500 rounded-lg ${
                errors.age ? "border-red-500" : ""
              }`}
            >
              <SelectValue placeholder="Select age" />
            </SelectTrigger>
            <SelectContent className="rounded-lg border-2">
              <SelectItem value="<33">&lt;33 Years</SelectItem>
              <SelectItem value="35-49">35 to 49 Years</SelectItem>
              <SelectItem value=">=50">&gt;=50 Years</SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        <FormField label="Gender" required error={errors.gender}>
          <Select
            value={data.gender}
            onValueChange={(value) => handleFieldChange("gender", value)}
          >
            <SelectTrigger
              className={`h-12 text-base border-gray-300 focus:border-blue-500 rounded-lg ${
                errors.gender ? "border-red-500" : ""
              }`}
            >
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent className="rounded-lg border-2">
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="prefer-not-to-say">
                Prefer not to say
              </SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="City" required error={errors.city}>
          <Input
            type="text"
            placeholder="Enter your city"
            value={data.city}
            onChange={(e) => handleFieldChange("city", e.target.value)}
            className={`h-12 text-base border-gray-300 focus:border-blue-500 rounded-lg ${
              errors.city ? "border-red-500" : ""
            }`}
          />
        </FormField>

        <FormField label="State" required error={errors.state}>
          {/* <Input
          type="text"
          placeholder="Enter your state"
          value={data.state}
          onChange={(e) => handleFieldChange("state", e.target.value)}
          className={`h-12 text-base border-gray-300 focus:border-blue-500 rounded-lg ${
            errors.state ? "border-red-500" : ""
          }`}
        /> */}
          <Select
            value={data.state}
            onValueChange={(value) => handleFieldChange("state", value)}
          >
            <SelectTrigger className="h-12 text-base border-gray-300 focus:border-blue-500 rounded-lg">
              <SelectValue placeholder="Select your state" />
            </SelectTrigger>
            <SelectContent className="rounded-lg border-2 bg-white z-50 max-h-60">
              {usStatesAndTerritories.map((state) => (
                <SelectItem key={state.value} value={state.value}>
                  {state.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Language" error={errors.language}>
          <Input
            type="text"
            placeholder="Enter your language"
            value={data.language}
            onChange={(e) => handleFieldChange("language", e.target.value)}
            className={`h-12 text-base border-gray-300 focus:border-blue-500 rounded-lg ${
              errors.language ? "border-red-500" : ""
            }`}
          />
        </FormField>

        <FormField label="Country of Origin" error={errors.countryOfOrigin}>
          <Input
            type="text"
            placeholder="Enter your country of origin"
            value={data.countryOfOrigin}
            onChange={(e) =>
              handleFieldChange("countryOfOrigin", e.target.value)
            }
            className={`h-12 text-base border-gray-300 focus:border-blue-500 rounded-lg ${
              errors.countryOfOrigin ? "border-red-500" : ""
            }`}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Religion" error={errors.religion}>
          <Input
            type="text"
            placeholder="Enter your religion"
            value={data.religion}
            onChange={(e) => handleFieldChange("religion", e.target.value)}
            className={`h-12 text-base border-gray-300 focus:border-blue-500 rounded-lg ${
              errors.religion ? "border-red-500" : ""
            }`}
          />
        </FormField>

        <FormField
          label="Contact Preference"
          required
          error={errors.contactPreference}
        >
          <Select
            value={data.contactPreference}
            onValueChange={(value) =>
              handleFieldChange("contactPreference", value)
            }
          >
            <SelectTrigger
              className={`h-12 text-base border-gray-300 focus:border-blue-500 rounded-lg ${
                errors.contactPreference ? "border-red-500" : ""
              }`}
            >
              <SelectValue placeholder="Select contact preference" />
            </SelectTrigger>
            <SelectContent className="rounded-lg border-2">
              <SelectItem value="phone">Phone call</SelectItem>
              <SelectItem value="sms">SMS</SelectItem>
              <SelectItem value="email">eMail</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <div className="flex justify-end pt-6">
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

export default DemographicStep;
