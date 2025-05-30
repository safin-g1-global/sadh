import React from 'react';
import FormField from '../FormField';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

interface DemographicStepProps {
  data: DemographicData;
  updateData: (data: Partial<DemographicData>) => void;
  onNext: () => void;
}

const DemographicStep: React.FC<DemographicStepProps> = ({ data, updateData, onNext }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="First Name" required>
          <Input
            type="text"
            placeholder="e.g. Stephen"
            value={data.firstName}
            onChange={(e) => updateData({ firstName: e.target.value })}
            className="h-12 text-base border-gray-300 focus:border-blue-500 rounded-lg"
          />
        </FormField>

        <FormField label="Last Name" required>
          <Input
            type="text"
            placeholder="e.g. King"
            value={data.lastName}
            onChange={(e) => updateData({ lastName: e.target.value })}
            className="h-12 text-base border-gray-300 focus:border-blue-500 rounded-lg"
          />
        </FormField>
      </div>

      <FormField label="Email Address" required>
        <Input
          type="email"
          placeholder="e.g. stephenking@lorem.com"
          value={data.email}
          onChange={(e) => updateData({ email: e.target.value })}
          className="h-12 text-base border-gray-300 focus:border-blue-500 rounded-lg"
        />
      </FormField>

      <FormField label="Phone Number" required>
        <Input
          type="tel"
          placeholder="e.g. +57 313 111 1111"
          value={data.phone}
          onChange={(e) => updateData({ phone: e.target.value })}
          className="h-12 text-base border-gray-300 focus:border-blue-500 rounded-lg"
        />
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Age" required>
          <Input
            type="number"
            placeholder="Enter your age"
            value={data.age}
            onChange={(e) => updateData({ age: e.target.value })}
            className="h-12 text-base border-gray-300 focus:border-blue-500 rounded-lg"
          />
        </FormField>

        <FormField label="Gender" required>
          <Select value={data.gender} onValueChange={(value) => updateData({ gender: value })}>
            <SelectTrigger className="h-12 text-base border-gray-300 focus:border-blue-500 rounded-lg">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent className="rounded-lg border-2">
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <FormField label="City" required>
        <Input
          type="text"
          placeholder="Enter your city"
          value={data.city}
          onChange={(e) => updateData({ city: e.target.value })}
          className="h-12 text-base border-gray-300 focus:border-blue-500 rounded-lg"
        />
      </FormField>

      <FormField label="State" required>
        <Input
          type="text"
          placeholder="Enter your state"
          value={data.state}
          onChange={(e) => updateData({ state: e.target.value })}
          className="h-12 text-base border-gray-300 focus:border-blue-500 rounded-lg"
        />
      </FormField>

      <FormField label="Language" required>
        <Input
          type="text"
          placeholder="Enter your language"
          value={data.language}
          onChange={(e) => updateData({ language: e.target.value })}
          className="h-12 text-base border-gray-300 focus:border-blue-500 rounded-lg"
        />
      </FormField>

      <FormField label="Country of Origin" required>
        <Input
          type="text"
          placeholder="Enter your country of origin"
          value={data.countryOfOrigin}
          onChange={(e) => updateData({ countryOfOrigin: e.target.value })}
          className="h-12 text-base border-gray-300 focus:border-blue-500 rounded-lg"
        />
      </FormField>

      <FormField label="Religion" required>
        <Input
          type="text"
          placeholder="Enter your religion"
          value={data.religion}
          onChange={(e) => updateData({ religion: e.target.value })}
          className="h-12 text-base border-gray-300 focus:border-blue-500 rounded-lg"
        />
      </FormField>

      <FormField label="Contact Preference" required>
        <Select value={data.contactPreference} onValueChange={(value) => updateData({ contactPreference: value })}>
          <SelectTrigger className="h-12 text-base border-gray-300 focus:border-blue-500 rounded-lg">
            <SelectValue placeholder="Select contact preference" />
          </SelectTrigger>
          <SelectContent className="rounded-lg border-2">
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="phone">Phone</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

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
