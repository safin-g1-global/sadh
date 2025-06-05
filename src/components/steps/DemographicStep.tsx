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
  const usStatesAndTerritories = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' },
    { value: 'DC', label: 'District of Columbia' },
    { value: 'AS', label: 'American Samoa' },
    { value: 'GU', label: 'Guam' },
    { value: 'MP', label: 'Northern Mariana Islands' },
    { value: 'PR', label: 'Puerto Rico' },
    { value: 'VI', label: 'U.S. Virgin Islands' }
  ];

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
            className="h-12 text-base border-gray-300 focus:border-[#1A6A87] rounded-lg"
          />
        </FormField>

        <FormField label="Last Name" required>
          <Input
            type="text"
            placeholder="e.g. King"
            value={data.lastName}
            onChange={(e) => updateData({ lastName: e.target.value })}
            className="h-12 text-base border-gray-300 focus:border-[#1A6A87] rounded-lg"
          />
        </FormField>
      </div>

      <FormField label="Email Address" required>
        <Input
          type="email"
          placeholder="e.g. stephenking@lorem.com"
          value={data.email}
          onChange={(e) => updateData({ email: e.target.value })}
          className="h-12 text-base border-gray-300 focus:border-[#1A6A87] rounded-lg"
        />
      </FormField>

      <FormField label="Phone Number" required>
        <Input
          type="tel"
          placeholder="e.g. +57 313 111 1111"
          value={data.phone}
          onChange={(e) => updateData({ phone: e.target.value })}
          className="h-12 text-base border-gray-300 focus:border-[#1A6A87] rounded-lg"
        />
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Age" required>
          <Input
            type="number"
            placeholder="Enter your age"
            value={data.age}
            onChange={(e) => updateData({ age: e.target.value })}
            className="h-12 text-base border-gray-300 focus:border-[#1A6A87] rounded-lg"
          />
        </FormField>

        <FormField label="Gender" required>
          <Select value={data.gender} onValueChange={(value) => updateData({ gender: value })}>
            <SelectTrigger className="h-12 text-base border-gray-300 focus:border-[#1A6A87] rounded-lg">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent className="rounded-lg border-2 bg-white z-50">
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
          className="h-12 text-base border-gray-300 focus:border-[#1A6A87] rounded-lg"
        />
      </FormField>

      <FormField label="State" required>
        <Select value={data.state} onValueChange={(value) => updateData({ state: value })}>
          <SelectTrigger className="h-12 text-base border-gray-300 focus:border-[#1A6A87] rounded-lg">
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

      <FormField label="Language" required>
        <Input
          type="text"
          placeholder="Enter your language"
          value={data.language}
          onChange={(e) => updateData({ language: e.target.value })}
          className="h-12 text-base border-gray-300 focus:border-[#1A6A87] rounded-lg"
        />
      </FormField>

      <FormField label="Country of Origin" required>
        <Input
          type="text"
          placeholder="Enter your country of origin"
          value={data.countryOfOrigin}
          onChange={(e) => updateData({ countryOfOrigin: e.target.value })}
          className="h-12 text-base border-gray-300 focus:border-[#1A6A87] rounded-lg"
        />
      </FormField>

      <FormField label="Religion" required>
        <Input
          type="text"
          placeholder="Enter your religion"
          value={data.religion}
          onChange={(e) => updateData({ religion: e.target.value })}
          className="h-12 text-base border-gray-300 focus:border-[#1A6A87] rounded-lg"
        />
      </FormField>

      <FormField label="Contact Preference" required>
        <Select value={data.contactPreference} onValueChange={(value) => updateData({ contactPreference: value })}>
          <SelectTrigger className="h-12 text-base border-gray-300 focus:border-[#1A6A87] rounded-lg">
            <SelectValue placeholder="Select contact preference" />
          </SelectTrigger>
          <SelectContent className="rounded-lg border-2 bg-white z-50">
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="phone">Phone</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      <div className="flex justify-end pt-6">
        <Button 
          type="submit" 
          className="bg-[#1A6A87] hover:bg-[#11A8DF] text-white px-8 py-3 rounded-lg text-base font-medium shadow-sm hover:shadow-md transition-all duration-200"
        >
          Next Step
        </Button>
      </div>
    </form>
  );
};

export default DemographicStep;
