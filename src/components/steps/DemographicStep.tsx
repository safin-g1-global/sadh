
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
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FormField label="First name" required>
          <Input
            value={data.firstName}
            onChange={(e) => updateData({ firstName: e.target.value })}
            placeholder="Enter your first name"
            required
            className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-200 rounded-xl transition-all duration-300"
          />
        </FormField>

        <FormField label="Last name" required>
          <Input
            value={data.lastName}
            onChange={(e) => updateData({ lastName: e.target.value })}
            placeholder="Enter your last name"
            required
            className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-200 rounded-xl transition-all duration-300"
          />
        </FormField>

        <FormField label="Age" required>
          <Select value={data.age} onValueChange={(value) => updateData({ age: value })}>
            <SelectTrigger className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl">
              <SelectValue placeholder="Select age range" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-2">
              <SelectItem value="18-25">18-25</SelectItem>
              <SelectItem value="26-35">26-35</SelectItem>
              <SelectItem value="36-45">36-45</SelectItem>
              <SelectItem value="46-55">46-55</SelectItem>
              <SelectItem value="56-65">56-65</SelectItem>
              <SelectItem value="65+">65+</SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        <FormField label="Gender" required>
          <Select value={data.gender} onValueChange={(value) => updateData({ gender: value })}>
            <SelectTrigger className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-2">
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        <FormField label="City" required>
          <Input
            value={data.city}
            onChange={(e) => updateData({ city: e.target.value })}
            placeholder="Enter your city"
            required
            className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-200 rounded-xl transition-all duration-300"
          />
        </FormField>

        <FormField label="State" required>
          <Select value={data.state} onValueChange={(value) => updateData({ state: value })}>
            <SelectTrigger className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-2">
              <SelectItem value="CA">California</SelectItem>
              <SelectItem value="NY">New York</SelectItem>
              <SelectItem value="TX">Texas</SelectItem>
              <SelectItem value="FL">Florida</SelectItem>
              <SelectItem value="IL">Illinois</SelectItem>
              <SelectItem value="NJ">New Jersey</SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        <FormField label="Language (optional)">
          <Input
            value={data.language}
            onChange={(e) => updateData({ language: e.target.value })}
            placeholder="Preferred language"
            className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-200 rounded-xl transition-all duration-300"
          />
        </FormField>

        <FormField label="Country of Origin (optional)">
          <Input
            value={data.countryOfOrigin}
            onChange={(e) => updateData({ countryOfOrigin: e.target.value })}
            placeholder="Country of origin"
            className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-200 rounded-xl transition-all duration-300"
          />
        </FormField>

        <FormField label="Phone" required>
          <Input
            value={data.phone}
            onChange={(e) => updateData({ phone: e.target.value })}
            placeholder="Your phone number"
            type="tel"
            required
            className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-200 rounded-xl transition-all duration-300"
          />
        </FormField>

        <FormField label="Email" required>
          <Input
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
            placeholder="Your email address"
            type="email"
            required
            className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-200 rounded-xl transition-all duration-300"
          />
        </FormField>

        <FormField label="Religion (optional)">
          <Input
            value={data.religion}
            onChange={(e) => updateData({ religion: e.target.value })}
            placeholder="Your religion"
            className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-200 rounded-xl transition-all duration-300"
          />
        </FormField>

        <FormField label="Contact Preference" required>
          <Select value={data.contactPreference} onValueChange={(value) => updateData({ contactPreference: value })}>
            <SelectTrigger className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl">
              <SelectValue placeholder="How would you like to be contacted?" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-2">
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="phone">Phone</SelectItem>
              <SelectItem value="text">Text Message</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <div className="flex justify-end pt-8">
        <Button 
          type="submit" 
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          Next Step →
        </Button>
      </div>
    </form>
  );
};

export default DemographicStep;
